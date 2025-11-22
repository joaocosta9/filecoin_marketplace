export const CATEGORIES = [
  "Documents",
  "Media",
  "Code/Scripts",
  "Data/Analytics",
  "Art/Design",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];
