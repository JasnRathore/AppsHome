import Link from "next/link"
import * as React from "react"
import { sitePaths } from "@/lib/site"
import { MobileThemeButton } from "./MobileThemeButton"

type MobileHeaderProps = {
    page: 'blog' | 'designs' | 'projects' | 'home';
}
export default function MobileHeader({page}: MobileHeaderProps) {
	return (
<><div className="flex items-center justify-between pr-3 gap-4">
					<h1 className="p-2 text-[clamp(3.35rem,13vw,4.4rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-mobile-text">
						Jasn
						<br />
						Rathore
					</h1>
					<MobileThemeButton />
				</div>

				<div className="mt-5 -mx-1 flex gap-3 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
					<Link
						href="/"
                        className={`flex ${page === 'home' ? "bg-mobile-surface-strong" : "bg-transparent"} min-w-fit items-center gap-[0.55rem] rounded-full border border-mobile-border  px-4 py-3 text-[0.92rem] leading-none text-mobile-text backdrop-blur-md`}>
						<span>All</span>
					</Link>
					<Link
						href={sitePaths.projects}
						className={`flex ${page === 'projects' ? "bg-mobile-surface-strong" : "bg-transparent"} min-w-fit items-center gap-[0.55rem] rounded-full border border-mobile-border  px-4 py-3 text-[0.92rem] leading-none text-mobile-text backdrop-blur-md`}
					>
						Projects
					</Link>
					<Link
						href={sitePaths.designs}
						className={`flex ${page === 'designs' ? "bg-mobile-surface-strong" : "bg-transparent"} min-w-fit items-center gap-[0.55rem] rounded-full border border-mobile-border  px-4 py-3 text-[0.92rem] leading-none text-mobile-text backdrop-blur-md`}
					>
						Designs
					</Link>
					<Link
						href={sitePaths.blog}
						className={`flex ${page === 'blog' ? "bg-mobile-surface-strong" : "bg-transparent"} min-w-fit items-center gap-[0.55rem] rounded-full border border-mobile-border  px-4 py-3 text-[0.92rem] leading-none text-mobile-text backdrop-blur-md`}
					>
						Blog
					</Link>
				</div>
                </>	)
}