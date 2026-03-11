export const PDF_COLORS = {
  darkBg: [13, 27, 42] as [number, number, number],
  darkerBg: [28, 28, 28] as [number, number, number],
  gold: [213, 171, 43] as [number, number, number],
  goldDark: [150, 122, 8] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  lightGray: [180, 180, 180] as [number, number, number],
  green: [34, 197, 94] as [number, number, number],
  red: [239, 68, 68] as [number, number, number],
  amber: [245, 158, 11] as [number, number, number],
};

export const SEVERITY_COLORS: Record<string, [number, number, number]> = {
  High: PDF_COLORS.red,
  Medium: PDF_COLORS.amber,
  Low: PDF_COLORS.green,
};
