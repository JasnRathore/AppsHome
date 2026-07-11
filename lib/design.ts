
const colors = [
  "#FF6F61", // Coral
  "#FF7F50", // Coral Orange
  "#FF8C69", // Salmon
  "#F97316", // Vibrant Orange
  "#F59E0B", // Amber
  "#FACC15", // Yellow
  "#84CC16", // Lime
  "#22C55E", // Green
  "#10B981", // Emerald
  "#14B8A6", // Teal
  "#06B6D4", // Cyan
  "#0EA5E9", // Sky Blue
  "#3B82F6", // Blue
  "#6366F1", // Indigo
  "#8B5CF6", // Violet
  "#A855F7", // Purple
  "#D946EF", // Fuchsia
  "#EC4899", // Pink
  "#E11D48", // Rose
  "#DC2626", // Red
  "#7C3AED", // Deep Purple
  "#2563EB", // Royal Blue
  "#0D9488", // Deep Teal
  "#16A34A", // Forest Green
  "#EA580C", // Burnt Orange
  "#C2410C", // Terracotta
  "#E76F51", // Clay
  "#2A9D8F", // Sea Green
  "#4F46E5", // Electric Indigo
  "#FB7185", // Soft Rose
];

const pastelColors = [
  "#FFD6A5", // Peach
  "#FFCAD4", // Light Pink
  "#FEC5BB", // Blush
  "#BDE0FE", // Baby Blue
  "#A2D2FF", // Sky
  "#CDB4DB", // Lavender
  "#D8F3DC", // Mint
  "#CAFFBF", // Light Green
  "#FDFFB6", // Soft Yellow
  "#9BF6FF", // Aqua
];

// good color but not matching
//  "/api/svg?cols=3&rows=2&seed=37344&bg=%230b132b&colorA=%231c2541&colorB=%235bc0eb&gap=0&padding=60&template=70&wide=35&radius=0&shapes=square,circle,quarter,half,pill",
// "/api/svg?cols=5&rows=2&seed=37344&bg=%233b2f2f&colorA=%238b5e3c&colorB=%23d9b382&gap=0&padding=60&template=70&wide=35&radius=0&shapes=square,circle,quarter,half,pill",
const palettes = [
  { bg: "#f5f0e1", colorA: "#6b8e23", colorB: "#b5c99a" },
  { bg: "#1e293b", colorA: "#0ea5e9", colorB: "#67e8f9" },
  { bg: "#330f1a", colorA: "#9c274d", colorB: "#f4a6b8" },
  { bg: "#f7f3e9", colorA: "#c65d3b", colorB: "#8c3d2e" },
  { bg: "#222222", colorA: "#ff6b6b", colorB: "#ffd166" },
  { bg: "#0a231e", colorA: "#1c5c48", colorB: "#2bb673" },
] as const;

const seeds = [37344, 82363, 92838, 62607, 78811] as const;

const colsForSpan = {
  1: 2,
  2: 5,
  3: 8,
} as const;

function patternUrl(
  cols: number,
  seed: number,
  palette: typeof palettes[number]
) {
  const params = new URLSearchParams({
    cols: String(cols),
    rows: "2",
    seed: String(seed),
    bg: palette.bg,
    colorA: palette.colorA,
    colorB: palette.colorB,
    gap: "0",
    padding: "60",
    template: "70",
    wide: "35",
    radius: "0",
    shapes: "square,circle,quarter,half,pill",
  });

  return `/api/svg?${params}`;
}

export type patternLen = 1 | 2 | 3;

export function getPattern(name: string, colSpan: patternLen): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }

  const cols = colsForSpan[colSpan];

  const combinations = palettes.length * seeds.length;
  const index = hash % combinations;

  const palette = palettes[index % palettes.length];
  const seed = seeds[Math.floor(index / palettes.length)];

  return patternUrl(cols, seed, palette);
}
export function getColor(name: string): string {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }

  return colors[hash % colors.length];
}
export function getPastelColor(name: string): string {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }

  return pastelColors[hash % pastelColors.length];
}
