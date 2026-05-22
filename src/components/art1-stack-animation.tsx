"use client";

import { motion } from "framer-motion";

const ART1_IMAGE_WIDTH = 1792;
const ART1_IMAGE_HEIGHT = 2400;

/** Default display width for standalone subtab preview. */
export const ART1_DEFAULT_DISPLAY_WIDTH_PX = 280;

const layerSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 18,
  mass: 1.15,
};

const ART1_LAYERS = [
  {
    id: "man",
    src: "/art1/man.jpg",
    delay: 0,
    entryOffsetY: 160,
  },
  {
    id: "bubble1",
    src: "/art1/bubble1.jpg",
    delay: 0.55,
    entryOffsetY: 96,
  },
  {
    id: "bubble2",
    src: "/art1/bubble2.jpg",
    delay: 1.1,
    entryOffsetY: 96,
  },
] as const;

type Art1StackAnimationProps = {
  displayWidthPx?: number;
  embedded?: boolean;
  static?: boolean;
  /** Skip opaque stack plate so layers blend with the page (decorative backgrounds). */
  transparentStack?: boolean;
  onSequenceComplete?: () => void;
  entryOffsets?: Partial<
    Record<(typeof ART1_LAYERS)[number]["id"], number>
  >;
};

function artDisplayHeight(widthPx: number) {
  return Math.round((widthPx * ART1_IMAGE_HEIGHT) / ART1_IMAGE_WIDTH);
}

export function Art1StackAnimation({
  displayWidthPx = ART1_DEFAULT_DISPLAY_WIDTH_PX,
  embedded = false,
  static: staticStack = false,
  transparentStack = false,
  onSequenceComplete,
  entryOffsets,
}: Art1StackAnimationProps) {
  const displayHeightPx = artDisplayHeight(displayWidthPx);

  const stack = (
    <div
      className={
        transparentStack
          ? "relative overflow-hidden"
          : "relative isolate overflow-hidden bg-surface-page-default"
      }
      style={{
        width: displayWidthPx,
        height: displayHeightPx,
      }}
    >
      {staticStack
        ? ART1_LAYERS.map(({ id, src }) => (
            <div
              key={id}
              className="absolute inset-x-0 top-0 mix-blend-multiply"
              style={{ height: displayHeightPx }}
            >
              <img
                src={src}
                alt=""
                aria-hidden
                width={ART1_IMAGE_WIDTH}
                height={ART1_IMAGE_HEIGHT}
                className="pointer-events-none h-full w-full object-fill"
                draggable={false}
              />
            </div>
          ))
        : ART1_LAYERS.map(({ id, src, delay, entryOffsetY }, index) => (
            <motion.div
              key={id}
              className="absolute inset-x-0 mix-blend-multiply"
              style={{ height: displayHeightPx, transform: "none" }}
              initial={{
                opacity: 0,
                top: entryOffsets?.[id] ?? entryOffsetY,
              }}
              animate={{ opacity: 1, top: 0 }}
              transition={{ ...layerSpring, delay }}
              onAnimationComplete={
                index === ART1_LAYERS.length - 1
                  ? onSequenceComplete
                  : undefined
              }
            >
              <img
                src={src}
                alt=""
                aria-hidden
                width={ART1_IMAGE_WIDTH}
                height={ART1_IMAGE_HEIGHT}
                className="pointer-events-none h-full w-full object-fill"
                draggable={false}
              />
            </motion.div>
          ))}
    </div>
  );

  return (
    <div
      className={
        embedded
          ? "flex justify-center"
          : "flex justify-center bg-surface-page-default p-[1rem]"
      }
    >
      {stack}
    </div>
  );
}
