"use client";

import { Clone, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { RefObject } from "react";
import type { Group } from "three";

import type { CharacterAnimation } from "@/features/character/character.types";

type CharacterModelProps = {
  animation: CharacterAnimation;
  modelUrl: string | null;
  rotationY: number;
};

type LoadedGltfModelProps = {
  animation: CharacterAnimation;
  modelUrl: string;
  rotationY: number;
};

type PlaceholderCharacterProps = {
  animation: CharacterAnimation;
  rotationY: number;
};

function LoadedGltfModel({ animation, modelUrl, rotationY }: LoadedGltfModelProps) {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF(modelUrl);

  useAnimatedGroup(groupRef, animation, rotationY);

  return (
    <group ref={groupRef} position={[0, -0.95, 0]} scale={1.8}>
      <Clone object={gltf.scene} />
    </group>
  );
}

function PlaceholderCharacter({ animation, rotationY }: PlaceholderCharacterProps) {
  const groupRef = useRef<Group>(null);

  useAnimatedGroup(groupRef, animation, rotationY);

  return (
    <group ref={groupRef} position={[0, -0.75, 0]}>
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ff9fb2" roughness={0.42} />
      </mesh>

      <mesh position={[-0.38, 0.33, 0.87]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#3a2e2e" roughness={0.5} />
      </mesh>
      <mesh position={[0.38, 0.33, 0.87]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#3a2e2e" roughness={0.5} />
      </mesh>
      <mesh position={[-0.34, 0.4, 0.94]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0.34, 0.4, 0.94]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      <mesh position={[-0.92, -0.18, 0.05]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.18, 0.5, 8, 18]} />
        <meshStandardMaterial color="#ffd6a5" roughness={0.5} />
      </mesh>
      <mesh position={[0.92, -0.18, 0.05]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.18, 0.5, 8, 18]} />
        <meshStandardMaterial color="#ffd6a5" roughness={0.5} />
      </mesh>

      <mesh position={[-0.35, -0.96, 0.08]} rotation={[0.18, 0, 0]}>
        <capsuleGeometry args={[0.18, 0.44, 8, 18]} />
        <meshStandardMaterial color="#bde0fe" roughness={0.48} />
      </mesh>
      <mesh position={[0.35, -0.96, 0.08]} rotation={[0.18, 0, 0]}>
        <capsuleGeometry args={[0.18, 0.44, 8, 18]} />
        <meshStandardMaterial color="#bde0fe" roughness={0.48} />
      </mesh>
    </group>
  );
}

function useAnimatedGroup(
  groupRef: RefObject<Group | null>,
  animation: CharacterAnimation,
  rotationY: number,
) {
  useFrame(() => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    const elapsed = performance.now() / 1000;
    const idleBob = Math.sin(elapsed * 2.5) * 0.05;
    const happyBob = animation === "happy" || animation === "level-up" ? Math.sin(elapsed * 9) * 0.1 : 0;
    const eatTilt = animation === "eat" ? Math.sin(elapsed * 10) * 0.1 : 0;
    const drinkTilt = animation === "drink" ? Math.sin(elapsed * 8) * -0.08 : 0;

    group.position.y = -0.75 + idleBob + happyBob;
    group.rotation.x = eatTilt + drinkTilt;
    group.rotation.z = animation === "level-up" ? Math.sin(elapsed * 7) * 0.08 : 0;
    group.rotation.y += (rotationY - group.rotation.y) * 0.14;
  });
}

export function CharacterModel({ animation, modelUrl, rotationY }: CharacterModelProps) {
  if (modelUrl) {
    return <LoadedGltfModel animation={animation} modelUrl={modelUrl} rotationY={rotationY} />;
  }

  return <PlaceholderCharacter animation={animation} rotationY={rotationY} />;
}

export function CharacterFallbackModel({ animation, rotationY }: Omit<CharacterModelProps, "modelUrl">) {
  return <PlaceholderCharacter animation={animation} rotationY={rotationY} />;
}
