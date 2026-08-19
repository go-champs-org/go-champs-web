/**
 * Formats a statistic number by rounding and adding a "+" prefix
 *
 * Rounding logic:
 * - Numbers < 100: Round to nearest 10
 * - Numbers >= 100 and < 1000: Round to nearest 100
 * - Numbers >= 1000: Round to nearest 1000
 *
 * Examples:
 * - 3247 -> "+3.000"
 * - 315 -> "+300"
 * - 95 -> "+90"
 * - 31 -> "+30"
 * - 5 -> "+10"
 * - 0 -> "+0"
 */
// Smaller numbers round to a smaller step, so "+90" never reads as "+100".
const ROUNDING_STEPS = [
  { upTo: 100, step: 10 },
  { upTo: 1000, step: 100 },
  { upTo: Infinity, step: 1000 }
];

export const formatStatNumber = (value: number): string => {
  if (value === 0) return '+0';

  const { step } = ROUNDING_STEPS.find(({ upTo }) => value < upTo) as {
    step: number;
  };
  const rounded = Math.round(value / step) * step;

  // German separators match the pt-BR format: 3000 -> "3.000"
  return `+${rounded.toLocaleString('de-DE')}`;
};
