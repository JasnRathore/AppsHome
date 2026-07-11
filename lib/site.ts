const portfolioBaseUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL?.replace(/\/$/, "") ?? ""

function portfolioPath(path: string) {
  return portfolioBaseUrl ? `${portfolioBaseUrl}${path}` : path
}

export const sitePaths = {
  home: portfolioBaseUrl || "/",
  projects: portfolioPath("/projects"),
  designs: portfolioPath("/designs"),
  blog: portfolioPath("/blog"),
} as const
