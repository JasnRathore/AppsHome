import { NextRequest, NextResponse } from "next/server";

// Pure computation, no Node-only APIs — works on either runtime.
export const runtime = "nodejs"; // switch to "edge" if you prefer edge delivery

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type ShapeKind = "square" | "blob" | "circle" | "pill-h" | "pill-v" | "quarter" | "half";
type Corner = "tl" | "tr" | "bl" | "br";
type Side = "top" | "bottom" | "left" | "right";
type Role = "a" | "b";
type ShapeKey = "square" | "circle" | "quarter" | "half" | "pill";

interface TemplateShape {
  x: number;
  y: number;
  w: number;
  h: number;
  type: ShapeKind;
  corner?: Corner;
  role: Role;
}

interface Template {
  name: string;
  needs: ShapeKey[];
  shapes: TemplateShape[];
}

interface RenderShape {
  x: number;
  y: number;
  w: number;
  h: number;
  type: ShapeKind;
  corner?: Corner;
  side?: Side;
  color: string;
}

interface PatternState {
  cols: number;
  rows: number;
  gap: number;
  padding: number;
  template: number; // motif richness 0-100
  wide: number; // scatter merges 0-100
  radius: number; // square corners 0-50
  seed: number;
  bg: string;
  palette: [string, string];
  shapes: Record<ShapeKey, boolean>;
}

const CELL = 120;
const BOX = 2;

/* ------------------------------------------------------------------ */
/* Seeded RNG                                                          */
/* ------------------------------------------------------------------ */
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function shuffled<T>(rand: () => number, arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ------------------------------------------------------------------ */
/* Tile library (2x2 supertiles)                                       */
/* ------------------------------------------------------------------ */
const TEMPLATES: Template[] = [
  { name: "flower", needs: ["quarter"], shapes: [
    { x: 0, y: 0, w: 1, h: 1, type: "quarter", corner: "br", role: "a" },
    { x: 1, y: 0, w: 1, h: 1, type: "quarter", corner: "bl", role: "b" },
    { x: 0, y: 1, w: 1, h: 1, type: "quarter", corner: "tr", role: "b" },
    { x: 1, y: 1, w: 1, h: 1, type: "quarter", corner: "tl", role: "a" },
  ] },
  { name: "big-circle", needs: ["circle"], shapes: [
    { x: 0, y: 0, w: 2, h: 2, type: "circle", role: "a" },
  ] },
  { name: "blob", needs: ["square"], shapes: [
    { x: 0, y: 0, w: 2, h: 2, type: "blob", role: "a" },
  ] },
  { name: "panel", needs: ["square"], shapes: [
    { x: 0, y: 0, w: 2, h: 2, type: "square", role: "a" },
  ] },
  { name: "quad-square", needs: ["square"], shapes: [
    { x: 0, y: 0, w: 1, h: 1, type: "square", role: "a" },
    { x: 1, y: 0, w: 1, h: 1, type: "square", role: "b" },
    { x: 0, y: 1, w: 1, h: 1, type: "square", role: "b" },
    { x: 1, y: 1, w: 1, h: 1, type: "square", role: "a" },
  ] },
  { name: "square-duo", needs: ["square"], shapes: [
    { x: 0, y: 0, w: 1, h: 2, type: "square", role: "a" },
    { x: 1, y: 0, w: 1, h: 2, type: "square", role: "b" },
  ] },
  { name: "square-corner", needs: ["square", "quarter"], shapes: [
    { x: 0, y: 0, w: 1, h: 1, type: "square", role: "a" },
    { x: 1, y: 1, w: 1, h: 1, type: "quarter", corner: "tl", role: "b" },
  ] },
  { name: "sweep", needs: ["quarter"], shapes: [
    { x: 0, y: 0, w: 2, h: 2, type: "quarter", corner: "tl", role: "a" },
  ] },
  { name: "s-curve", needs: ["quarter"], shapes: [
    { x: 0, y: 0, w: 1, h: 1, type: "quarter", corner: "br", role: "a" },
    { x: 1, y: 1, w: 1, h: 1, type: "quarter", corner: "tl", role: "a" },
  ] },
  { name: "double-pill", needs: ["pill"], shapes: [
    { x: 0, y: 0, w: 2, h: 1, type: "pill-h", role: "a" },
    { x: 0, y: 1, w: 2, h: 1, type: "pill-h", role: "b" },
  ] },
  { name: "quad-circle", needs: ["circle"], shapes: [
    { x: 0, y: 0, w: 1, h: 1, type: "circle", role: "a" },
    { x: 1, y: 0, w: 1, h: 1, type: "circle", role: "b" },
    { x: 0, y: 1, w: 1, h: 1, type: "circle", role: "b" },
    { x: 1, y: 1, w: 1, h: 1, type: "circle", role: "a" },
  ] },
  { name: "plus", needs: ["pill"], shapes: [
    { x: 0, y: 0.5, w: 2, h: 1, type: "pill-h", role: "a" },
    { x: 0.5, y: 0, w: 1, h: 2, type: "pill-v", role: "b" },
  ] },
  { name: "corner-duo", needs: ["quarter", "circle"], shapes: [
    { x: 0, y: 0, w: 1, h: 1, type: "quarter", corner: "br", role: "a" },
    { x: 1, y: 1, w: 1, h: 1, type: "circle", role: "b" },
  ] },
];

const ROTATE_CW: Record<Corner, Corner> = { tl: "tr", tr: "br", br: "bl", bl: "tl" };
const MIRROR: Record<Corner, Corner> = { tl: "tr", tr: "tl", bl: "br", br: "bl" };

function rotateCornerCW(c: Corner) {
  return ROTATE_CW[c];
}
function mirrorCorner(c: Corner) {
  return MIRROR[c] ?? c;
}

function transformShape(s: TemplateShape, mirror: boolean, k: number): TemplateShape {
  let { x, y, w, h, type, corner, role } = s;
  if (mirror) {
    x = BOX - x - w;
    if (type === "quarter" && corner) corner = mirrorCorner(corner);
  }
  for (let i = 0; i < k; i++) {
    const nx = BOX - y - h;
    const ny = x;
    const nw = h;
    const nh = w;
    x = nx;
    y = ny;
    w = nw;
    h = nh;
    if (type === "quarter" && corner) corner = rotateCornerCW(corner);
    else if (type === "pill-h") type = "pill-v";
    else if (type === "pill-v") type = "pill-h";
  }
  return { x, y, w, h, type, corner, role };
}

function templateNeedsSatisfied(t: Template, shapes: Record<ShapeKey, boolean>) {
  return t.needs.every((n) => shapes[n]);
}

function placeTemplate(
  bx: number,
  by: number,
  rand: () => number,
  out: RenderShape[],
  state: PatternState
): boolean {
  const pool = TEMPLATES.filter((t) => templateNeedsSatisfied(t, state.shapes));
  if (pool.length === 0) return false;
  const tpl = pick(rand, pool);
  const mirror = rand() < 0.5;
  const k = Math.floor(rand() * 4);
  const roles = [...new Set(tpl.shapes.map((s) => s.role))];
  const cols = shuffled(rand, state.palette);
  const roleColor: Record<string, string> = {};
  roles.forEach((r, i) => {
    roleColor[r] = cols[i % cols.length];
  });
  tpl.shapes.forEach((s) => {
    const t = transformShape(s, mirror, k);
    out.push({
      x: bx + t.x,
      y: by + t.y,
      w: t.w,
      h: t.h,
      type: t.type,
      corner: t.corner,
      color: roleColor[t.role],
    });
  });
  return true;
}

/* ------------------------------------------------------------------ */
/* Scatter fallback                                                     */
/* ------------------------------------------------------------------ */
function enabledSinglePool(state: PatternState): ShapeKey[] {
  const list = (Object.entries(state.shapes) as [ShapeKey, boolean][])
    .filter(([k, v]) => v && k !== "pill")
    .map(([k]) => k);
  return list.length ? list : ["square"];
}

function scatterBlock(
  bx: number,
  by: number,
  cols: number,
  rows: number,
  rand: () => number,
  out: RenderShape[],
  state: PatternState
) {
  const cells: { x: number; y: number }[] = [];
  for (let dy = 0; dy < 2; dy++) {
    for (let dx = 0; dx < 2; dx++) {
      if (bx + dx < cols && by + dy < rows) cells.push({ x: bx + dx, y: by + dy });
    }
  }
  const occ: Record<string, boolean> = {};
  const key = (x: number, y: number) => `${x},${y}`;

  cells.forEach((c) => {
    if (occ[key(c.x, c.y)]) return;
    const canMergeRight =
      state.shapes.pill &&
      cells.some((o) => o.x === c.x + 1 && o.y === c.y) &&
      !occ[key(c.x + 1, c.y)] &&
      rand() * 100 < state.wide;
    const canMergeDown =
      !canMergeRight &&
      state.shapes.pill &&
      cells.some((o) => o.x === c.x && o.y === c.y + 1) &&
      !occ[key(c.x, c.y + 1)] &&
      rand() * 100 < state.wide;

    let w = 1;
    let h = 1;
    let type: ShapeKind;
    if (canMergeRight) {
      w = 2;
      h = 1;
      type = "pill-h";
      occ[key(c.x + 1, c.y)] = true;
    } else if (canMergeDown) {
      w = 1;
      h = 2;
      type = "pill-v";
      occ[key(c.x, c.y + 1)] = true;
    } else {
      type = pick(rand, enabledSinglePool(state)) as ShapeKind;
    }
    occ[key(c.x, c.y)] = true;

    let corner: Corner | undefined;
    let side: Side | undefined;
    if (type === "quarter") corner = pick(rand, ["tl", "tr", "bl", "br"] as Corner[]);
    if (type === "half") side = pick(rand, ["top", "bottom", "left", "right"] as Side[]);

    out.push({ x: c.x, y: c.y, w, h, type, corner, side, color: pick(rand, state.palette) });
  });
}

function buildLayout(state: PatternState, rand: () => number): RenderShape[] {
  const { cols, rows } = state;
  const shapes: RenderShape[] = [];
  const done: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  for (let by = 0; by < rows; by += 2) {
    for (let bx = 0; bx < cols; bx += 2) {
      if (done[by][bx]) continue;
      const fullBlock = bx + 1 < cols && by + 1 < rows;
      let placed = false;
      if (fullBlock && rand() * 100 < state.template) {
        placed = placeTemplate(bx, by, rand, shapes, state);
      }
      if (!placed) {
        scatterBlock(bx, by, cols, rows, rand, shapes, state);
      }
      done[by][bx] = true;
      if (bx + 1 < cols) done[by][bx + 1] = true;
      if (by + 1 < rows) done[by + 1][bx] = true;
      if (bx + 1 < cols && by + 1 < rows) done[by + 1][bx + 1] = true;
    }
  }
  return shapes;
}

/* ------------------------------------------------------------------ */
/* Rendering                                                            */
/* ------------------------------------------------------------------ */
function shapeToSvg(s: RenderShape, pad: number, state: PatternState): string {
  const g = (state.gap / 100) * CELL * 0.5;
  const x = s.x * CELL + g + pad;
  const y = s.y * CELL + g + pad;
  const w = s.w * CELL - g * 2;
  const h = s.h * CELL - g * 2;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const rad = Math.min(w, h) * (state.radius / 100);

  switch (s.type) {
    case "square":
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rad}" ry="${rad}" fill="${s.color}"/>`;
    case "blob":
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w, h) * 0.42}" ry="${Math.min(w, h) * 0.42}" fill="${s.color}"/>`;
    case "circle":
      return `<circle cx="${cx}" cy="${cy}" r="${Math.min(w, h) / 2}" fill="${s.color}"/>`;
    case "pill-h":
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" ry="${h / 2}" fill="${s.color}"/>`;
    case "pill-v":
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}" ry="${w / 2}" fill="${s.color}"/>`;
    case "quarter": {
      const R = Math.min(w, h);
      let d = "";
      if (s.corner === "tl") d = `M ${x},${y} L ${x + R},${y} A ${R},${R} 0 0 1 ${x},${y + R} Z`;
      if (s.corner === "tr") d = `M ${x + w},${y} L ${x + w},${y + R} A ${R},${R} 0 0 1 ${x + w - R},${y} Z`;
      if (s.corner === "bl") d = `M ${x},${y + h} L ${x},${y + h - R} A ${R},${R} 0 0 1 ${x + R},${y + h} Z`;
      if (s.corner === "br") d = `M ${x + w},${y + h} L ${x + w - R},${y + h} A ${R},${R} 0 0 1 ${x + w},${y + h - R} Z`;
      return `<path d="${d}" fill="${s.color}"/>`;
    }
    case "half": {
      let d = "";
      if (s.side === "left") d = `M ${x + w},${y} A ${w / 2},${h / 2} 0 0 0 ${x + w},${y + h} Z`;
      if (s.side === "right") d = `M ${x},${y} A ${w / 2},${h / 2} 0 0 1 ${x},${y + h} Z`;
      if (s.side === "top") d = `M ${x},${y + h} A ${w / 2},${h / 2} 0 0 1 ${x + w},${y + h} Z`;
      if (s.side === "bottom") d = `M ${x},${y} A ${w / 2},${h / 2} 0 0 0 ${x + w},${y} Z`;
      return `<path d="${d}" fill="${s.color}"/>`;
    }
    default:
      return "";
  }
}

function buildSvgString(state: PatternState): string {
  const rand = mulberry32(state.seed || 1);
  const shapes = buildLayout(state, rand);
  const pad = (state.padding / 100) * CELL;
  const W = state.cols * CELL + pad * 2;
  const H = state.rows * CELL + pad * 2;
  const body = shapes.map((s) => shapeToSvg(s, pad, state)).join("\n  ");
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">\n  <rect width="${W}" height="${H}" fill="${state.bg}"/>\n  ${body}\n</svg>`;
}

/* ------------------------------------------------------------------ */
/* Query parsing                                                        */
/* ------------------------------------------------------------------ */
const HEX_RE = /^#[0-9a-fA-F]{3,8}$/;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function getInt(sp: URLSearchParams, key: string, def: number, min: number, max: number) {
  const raw = sp.get(key);
  if (raw === null) return def;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? clamp(n, min, max) : def;
}

function getFloat(sp: URLSearchParams, key: string, def: number, min: number, max: number) {
  const raw = sp.get(key);
  if (raw === null) return def;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? clamp(n, min, max) : def;
}

function getColor(sp: URLSearchParams, key: string, def: string) {
  const raw = sp.get(key);
  if (raw === null) return def;
  const val = raw.startsWith("#") ? raw : `#${raw}`;
  return HEX_RE.test(val) ? val : def;
}

function getShapes(sp: URLSearchParams): Record<ShapeKey, boolean> {
  const all: ShapeKey[] = ["square", "circle", "quarter", "half", "pill"];
  const raw = sp.get("shapes");
  if (raw === null) {
    return { square: true, circle: true, quarter: true, half: true, pill: true };
  }
  const enabled = new Set(raw.split(",").map((s) => s.trim().toLowerCase()));
  const result = {} as Record<ShapeKey, boolean>;
  all.forEach((k) => {
    result[k] = enabled.has(k);
  });
  // never let every shape end up disabled
  if (!Object.values(result).some(Boolean)) result.square = true;
  return result;
}

function parseState(sp: URLSearchParams): PatternState {
  return {
    cols: getInt(sp, "cols", 8, 1, 60),
    rows: getInt(sp, "rows", 4, 1, 60),
    gap: getFloat(sp, "gap", 0, 0, 16),
    padding: getFloat(sp, "padding", 12, 0, 60),
    template: getFloat(sp, "template", 70, 0, 100),
    wide: getFloat(sp, "wide", 35, 0, 100),
    radius: getFloat(sp, "radius", 0, 0, 50),
    seed: getInt(sp, "seed", 1, -2147483648, 2147483647),
    bg: getColor(sp, "bg", "#0a231e"),
    palette: [getColor(sp, "colorA", "#1c5c48"), getColor(sp, "colorB", "#2bb673")],
    shapes: getShapes(sp),
  };
}

/* ------------------------------------------------------------------ */
/* Route handler                                                        */
/* ------------------------------------------------------------------ */
// GET /api/pattern?cols=8&rows=4&seed=42&bg=%230a231e&colorA=%231c5c48&colorB=%232bb673
//     &gap=0&padding=12&template=70&wide=35&radius=0&shapes=square,circle,quarter,half,pill
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const state = parseState(sp);

  // guard against pathologically large requests
  if (state.cols * state.rows > 1600) {
    return NextResponse.json(
      { error: "cols * rows too large (max 1600 cells)" },
      { status: 400 }
    );
  }

  const svg = buildSvgString(state);

  const headers: Record<string, string> = {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "public, max-age=31536000, immutable",
  };
  if (sp.get("download")) {
    headers["Content-Disposition"] = `attachment; filename="pattern-${state.seed}.svg"`;
  }

  return new NextResponse(svg, { status: 200, headers });
}
