import Link from "next/link"
import { sitePaths } from "@/lib/site"
import { MobileThemeButton } from "./MobileThemeButton"

type MobileHeaderProps = {
    page: 'blog' | 'designs' | 'projects' | 'home';
}
export default function MobileHeader({page}: MobileHeaderProps) {
	return (
<><div className="flex items-center justify-between pr-3 gap-4">
					<h1 className="p-2 text-[clamp(3.35rem,13vw,4.4rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-mobile-text">
						Apps
					</h1>
					<MobileThemeButton />
				</div>
                </>	)
}
