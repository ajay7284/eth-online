import GradualSpacing from "../lib/HeaderUtil";

export async function GradualSpacingDemo() {
  return (
    <GradualSpacing
      className="font-display mt-[120px] text-center text-4xl font-bold tracking-[-0.1em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
      text="Welcome to Gradual Spacing"
    />
  );
}
