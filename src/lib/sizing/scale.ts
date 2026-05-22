export const REM_BASE_PX = 16;
export const SIZE_INCREMENT_REM = 0.25;
export const SIZE_MIN_REM = 0.25;
export const SIZE_MAX_REM = 5;

export type SizeToken = {
  rem: number;
  px: number;
  remLabel: string;
};

function formatRem(rem: number) {
  return `${Number(rem.toFixed(2))}rem`;
}

export const SIZING_SCALE: SizeToken[] = Array.from(
  { length: (SIZE_MAX_REM - SIZE_MIN_REM) / SIZE_INCREMENT_REM + 1 },
  (_, index) => {
    const rem = SIZE_MIN_REM + index * SIZE_INCREMENT_REM;
    const px = rem * REM_BASE_PX;

    return {
      rem,
      px,
      remLabel: formatRem(rem),
    };
  },
);
