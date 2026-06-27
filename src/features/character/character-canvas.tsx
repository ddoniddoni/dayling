"use client";

import { Environment, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Component, Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { PCFShadowMap } from "three";

import {
  CharacterFallbackModel,
  CharacterModel,
} from "@/features/character/character-model";
import type { CharacterAnimation } from "@/features/character/character.types";

const globalWithWarnFilter = globalThis as typeof globalThis & {
  __daylingClockWarningFiltered?: boolean;
};

if (
  process.env.NODE_ENV === "development" &&
  typeof window !== "undefined" &&
  !globalWithWarnFilter.__daylingClockWarningFiltered
) {
  const originalWarn = console.warn;

  console.warn = (...args) => {
    const [firstArg] = args;

    if (
      typeof firstArg === "string" &&
      firstArg.includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }

    originalWarn(...args);
  };

  globalWithWarnFilter.__daylingClockWarningFiltered = true;
}

const TAP_MOVE_THRESHOLD = 8;
const MAX_DRAG_STEP = 36;
const ACTION_ANIMATION_MS = 900;

type CharacterCanvasProps = {
  animation: CharacterAnimation;
  modelUrl: string | null;
  onAnimationComplete?: () => void;
  onTap?: () => void;
};

type GltfErrorBoundaryProps = {
  animation: CharacterAnimation;
  children: ReactNode;
  rotationY: number;
};

type GltfErrorBoundaryState = {
  hasError: boolean;
};

class GltfErrorBoundary extends Component<GltfErrorBoundaryProps, GltfErrorBoundaryState> {
  state: GltfErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(previousProps: GltfErrorBoundaryProps) {
    if (previousProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <CharacterFallbackModel
          animation={this.props.animation}
          rotationY={this.props.rotationY}
        />
      );
    }

    return this.props.children;
  }
}

export function CharacterCanvas({
  animation,
  modelUrl,
  onAnimationComplete,
  onTap,
}: CharacterCanvasProps) {
  const [rotationY, setRotationY] = useState(0);
  const pointerRef = useRef({
    active: false,
    pointerId: -1,
    lastX: 0,
    totalMove: 0,
  });

  useEffect(() => {
    if (animation === "idle") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onAnimationComplete?.();
    }, ACTION_ANIMATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [animation, onAnimationComplete]);

  return (
    <div
      className="relative h-full min-h-[18rem] w-full cursor-grab touch-none overflow-hidden rounded-[28px] bg-gradient-to-b from-white/90 to-[#FFF2DE] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)] active:cursor-grabbing"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        pointerRef.current = {
          active: true,
          pointerId: event.pointerId,
          lastX: event.clientX,
          totalMove: 0,
        };
      }}
      onPointerMove={(event) => {
        const pointer = pointerRef.current;

        if (!pointer.active || pointer.pointerId !== event.pointerId) {
          return;
        }

        const deltaX = Math.max(-MAX_DRAG_STEP, Math.min(MAX_DRAG_STEP, event.clientX - pointer.lastX));
        pointer.lastX = event.clientX;
        pointer.totalMove += Math.abs(deltaX);
        setRotationY((current) => current + deltaX * 0.012);
      }}
      onPointerUp={(event) => {
        const pointer = pointerRef.current;

        if (pointer.active && pointer.pointerId === event.pointerId) {
          if (pointer.totalMove <= TAP_MOVE_THRESHOLD) {
            onTap?.();
          }

          pointerRef.current.active = false;
        }
      }}
      onPointerCancel={() => {
        pointerRef.current.active = false;
      }}
      role="button"
      tabIndex={0}
      aria-label="캐릭터를 드래그해서 돌리거나 탭해서 반응시키기"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onTap?.();
        }
      }}
    >
      <Canvas
        className="h-full w-full"
        dpr={[1, 1.8]}
        shadows={{ type: PCFShadowMap }}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.25, 5]} fov={38} />
        <ambientLight intensity={1.15} />
        <directionalLight
          castShadow
          intensity={2}
          position={[3, 4, 5]}
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight intensity={1.8} position={[-3, 3, 4]} angle={0.45} penumbra={0.7} />
        <Stars radius={18} depth={8} count={28} factor={0.9} saturation={0} fade speed={0.35} />
        <Suspense fallback={<CharacterFallbackModel animation="idle" rotationY={rotationY} />}>
          <GltfErrorBoundary animation={animation} rotationY={rotationY}>
            <CharacterModel animation={animation} modelUrl={modelUrl} rotationY={rotationY} />
          </GltfErrorBoundary>
          <Environment preset="city" />
        </Suspense>
        <mesh position={[0, -1.78, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1.45, 40]} />
          <meshStandardMaterial color="#ffe1e8" roughness={0.72} />
        </mesh>
        <OrbitControls
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
          target={[0, -0.2, 0]}
        />
      </Canvas>
    </div>
  );
}
