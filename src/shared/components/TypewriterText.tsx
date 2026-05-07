import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  speed?: number;
  className?: string;
};

export function TypewriterText({
  text,
  speed = 100,
  className = "",
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));

      currentIndex++;

      if (currentIndex >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <h1 className={className}>
      {displayedText}
      <span
        className="
                ml-1
                inline-block
                w-0.75
                h-[0.80em]
                bg-cyan-400
                animate-caret-blink
              "
      />
    </h1>
  );
}
