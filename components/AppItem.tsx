import { ArrowCircleUpRightIcon, ArrowUpRightIcon, YoutubeLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { BentoGridItem, BentoGridItemProps } from "./bento"

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

type patternLen = 1 | 2 | 3;

function getPattern(name: string, colSpan: patternLen): string {
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
function getColor(name: string): string {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }

  return colors[hash % colors.length];
}
function getPastelColor(name: string): string {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }

  return pastelColors[hash % pastelColors.length];
}

type CardMode = "default" | "compact"

type AppCardProps = BentoGridItemProps & {
  mode?: CardMode
  name: string
  description?: string
  orientation?: "top" | "left" | "right"
  tags?: Array<string>
  link?: string
  videoLink?: string
}

export function AppItem({
  mode = "default",
  name = "hello",
  description = "",
  orientation = "top",
  tags = [],
  link,
  videoLink,
  colSpan,
  rowSpan,
  ...props
}: AppCardProps) {
  return (
    <BentoGridItem
      {...props}
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={`flex ${
        orientation === "top" ? "flex-col" : "flex-row"
      } 2xl:p-7 gap-3 sm:gap-4 2xl:gap-4`}
    >
      {rowSpan === 2 ? (
        <div
          className="text-transparent rounded-[12px] w-full h-1/2 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getPattern(
              name,
              colSpan as patternLen
            )})`,
          }}
        >
          d
        </div>
      ) : null}

      {rowSpan !== 2 &&
      (colSpan as number) >= 2 &&
      orientation !== "top" ? (
        <div
          className="text-transparent rounded-[12px] w-1/3 h-full bg-cover bg-center bg-no-repeat shrink-0"
          style={{
            backgroundImage: `url(${getPattern(
              name,
              Math.floor((colSpan as number) / 2) as patternLen
            )})`,
          }}
        >
          d
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-3">
          {tags.map((value) => (
            <div
              className="px-2 py-1 rounded-[12px] text-black"
              key={value}
              style={{ backgroundColor: getPastelColor(value) }}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-sans underline tracking-wide">{name}</h1>
          <div className="flex flex-row gap-3">
          {videoLink && (
            <a
              data-cursor="pointer-invert"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center  gap-2 rounded-[10px] dark:bg-white bg-black px-4 py-2 text-sm text-white dark:text-black hover:opacity-80 transition"
          >
            Video Demo <ArrowUpRightIcon size={22} />
          </a>
          )}
        {link && (
            <a
              data-cursor="pointer-invert"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center  gap-2 rounded-[10px] dark:bg-white bg-black px-4 py-2 text-sm text-white dark:text-black hover:opacity-80 transition"
          >
            Visit <ArrowUpRightIcon size={22} />
          </a>
            )}
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </BentoGridItem>
  )
}
