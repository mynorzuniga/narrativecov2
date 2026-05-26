"use client";

import { motion } from "framer-motion";

const ART2_IMAGE_WIDTH = 1792;
const ART2_IMAGE_HEIGHT = 2400;

/** Default display width for standalone subtab preview. */
export const ART2_DEFAULT_DISPLAY_WIDTH_PX = 280;

export function art2DisplayHeight(widthPx: number) {
  return Math.round((widthPx * ART2_IMAGE_HEIGHT) / ART2_IMAGE_WIDTH);
}

const layerSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 18,
  mass: 1.15,
};

const bubblePopSpring = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
  mass: 0.85,
};

const ART2_LAYERS = [
  {
    id: "man",
    src: "/art2/man.jpg",
    delay: 0,
    entryOffsetY: 160,
    entryMode: "slide",
  },
  {
    id: "bubble1",
    src: "/art2/bubble1.jpg",
    delay: 0.38,
    entryMode: "pop",
  },
  {
    id: "bubble2",
    src: "/art2/bubble2.jpg",
    delay: 0.72,
    entryMode: "pop",
  },
] as const;

type Art2StackAnimationProps = {
  displayWidthPx?: number;
  embedded?: boolean;
  static?: boolean;
  /** Skip opaque stack plate so layers blend with the page (decorative backgrounds). */
  transparentStack?: boolean;
  /** Override layer spring (e.g. slower preview timing). */
  springConfig?: typeof layerSpring;
  /** Override per-layer stagger delay in seconds. */
  layerDelays?: Partial<
    Record<(typeof ART2_LAYERS)[number]["id"], number>
  >;
  onSequenceComplete?: () => void;
  entryOffsets?: Partial<
    Record<(typeof ART2_LAYERS)[number]["id"], number>
  >;
};

function artDisplayHeight(widthPx: number) {
  return art2DisplayHeight(widthPx);
}

export function Art2StackAnimation({
  displayWidthPx = ART2_DEFAULT_DISPLAY_WIDTH_PX,
  embedded = false,
  static: staticStack = false,
  transparentStack = false,
  springConfig = layerSpring,
  layerDelays,
  onSequenceComplete,
  entryOffsets,
}: Art2StackAnimationProps) {
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
        ? ART2_LAYERS.map(({ id, src }) => (
            <div
              key={id}
              className="absolute inset-x-0 top-0 mix-blend-multiply"
              style={{ height: displayHeightPx }}
            >
              <img
                src={src}
                alt=""
                aria-hidden
                width={ART2_IMAGE_WIDTH}
                height={ART2_IMAGE_HEIGHT}
                className="pointer-events-none h-full w-full object-fill"
                draggable={false}
              />
            </div>
          ))
        : ART2_LAYERS.map((layer, index) => {
            const { id, src, delay, entryMode } = layer;
            const isPop = entryMode === "pop";
            const entryOffsetY =
              "entryOffsetY" in layer ? layer.entryOffsetY : 0;

            return (
            <motion.div
              key={id}
              className="absolute inset-x-0 mix-blend-multiply"
              style={{
                height: displayHeightPx,
                ...(isPop
                  ? { top: 0, transformOrigin: "center center" }
                  : { transform: "none" }),
              }}
              initial={
                isPop
                  ? { opacity: 0, scale: 0.88 }
                  : {
                      opacity: 0,
                      top: entryOffsets?.[id] ?? entryOffsetY,
                    }
              }
              animate={
                isPop
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, top: 0 }
              }
              transition={{
                ...(isPop ? bubblePopSpring : springConfig),
                delay: layerDelays?.[id] ?? delay,
              }}
              onAnimationComplete={
                index === ART2_LAYERS.length - 1
                  ? onSequenceComplete
                  : undefined
              }
            >
              <img
                src={src}
                alt=""
                aria-hidden
                width={ART2_IMAGE_WIDTH}
                height={ART2_IMAGE_HEIGHT}
                className="pointer-events-none h-full w-full object-fill"
                draggable={false}
              />
            </motion.div>
            );
          })}
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
