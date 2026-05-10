/**
 * Formats a statistic number by rounding and adding a "+" prefix
 *
 * Rounding logic:
 * - Numbers < 1000: Round to nearest 100
 * - Numbers >= 1000: Round to nearest 1000
 *
 * Examples:
 * - 3247 -> "+3.000"
 * - 315 -> "+300"
 * - 95 -> "+100"
 * - 50 -> "+100"
 * - 0 -> "+0"
 */
export const formatStatNumber = (value: number): string => {
  let rounded: number;

  if (value === 0) {
    return '+0';
  }

  if (value < 1000) {
    // Round to nearest 100
    rounded = Math.round(value / 100) * 100;
  } else {
    // Round to nearest 1000
    rounded = Math.round(value / 1000) * 1000;
  }

  // Format with locale separator (e.g., 3000 -> "3.000")
  const formatted = rounded.toLocaleString('de-DE');

  return `+${formatted}`;
};
