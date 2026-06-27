type CharacterPlaceholderProps = {
  size?: "md" | "lg";
  className?: string;
};

export function CharacterPlaceholder({
  size = "lg",
  className = "",
}: CharacterPlaceholderProps) {
  const sizeClass = size === "lg" ? "h-72 w-64" : "h-52 w-48";

  return (
    <div className={`relative ${sizeClass} ${className}`} aria-label="3D character placeholder">
      <div className="absolute inset-x-8 bottom-2 h-8 rounded-full bg-[#3A2E2E]/10 blur-sm" />
      <div className="absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-[45%] bg-gradient-to-b from-[#FFD9E1] to-[#FF9FB2] shadow-[inset_-18px_-20px_30px_rgba(154,83,97,0.15),0_20px_35px_rgba(255,159,178,0.22)]" />
      <div className="absolute left-[4.25rem] top-24 h-5 w-5 rounded-full bg-[#3A2E2E]" />
      <div className="absolute right-[4.25rem] top-24 h-5 w-5 rounded-full bg-[#3A2E2E]" />
      <div className="absolute left-1/2 top-36 h-7 w-16 -translate-x-1/2 rounded-b-full border-b-4 border-[#3A2E2E]" />
      <div className="absolute left-10 top-40 h-16 w-12 rotate-[-18deg] rounded-full bg-[#FFD6A5]" />
      <div className="absolute right-10 top-40 h-16 w-12 rotate-[18deg] rounded-full bg-[#FFD6A5]" />
      <div className="absolute left-[5.25rem] bottom-10 h-14 w-12 rounded-full bg-[#BDE0FE]" />
      <div className="absolute right-[5.25rem] bottom-10 h-14 w-12 rounded-full bg-[#BDE0FE]" />
      <div className="absolute left-[4.6rem] top-16 h-6 w-4 rotate-[-20deg] rounded-full bg-white/65" />
    </div>
  );
}
