import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { BentoGridItem, BentoGridItemProps } from "./bento";
import { getPastelColor, type patternLen, getPattern, getPattern1R } from "@/lib/design";

type AppCardProps = BentoGridItemProps & {
	mode?: CardMode;
	name: string;
	description?: string;
	orientation?: "top" | "left" | "right";
	tags?: Array<string>;
	link?: string;
	videoLink?: string;
	delay?: number;
};

const contentVariants = {
	initial: {
		opacity: 0,
		y: 18,
	},
	animate: (custom: { delay: number }) => ({
		opacity: 1,
		y: 0,
		transition: {
			type: "spring" as const,
			stiffness: 260,
			damping: 24,
			delay: custom.delay,
		},
	}),
};

const mediaVariants = {
	initial: {
		opacity: 0,
		scale: 0.94,
	},
	animate: (custom: { delay: number }) => ({
		opacity: 1,
		scale: 1,
		transition: {
			type: "spring" as const,
			stiffness: 180,
			damping: 22,
			delay: custom.delay,
		},
	}),
};

const buttonVariants = {
	initial: {
		scale: 0,
		opacity: 0,
		y: 12,
	},
	animate: (custom: { delay: number }) => ({
		scale: 1,
		opacity: 1,
		y: 0,
		transition: {
			type: "spring" as const,
			stiffness: 320,
			damping: 20,
			delay: custom.delay,
		},
	}),
};

const tagVariants = {
	initial: {
		scale: 0,
		opacity: 0,
	},
	animate: (custom: { delay: number }) => ({
		scale: 1,
		opacity: 1,
		transition: {
			type: "spring" as const,
			stiffness: 400,
			damping: 18,
			delay: custom.delay,
		},
	}),
	hover: {
		y: -2,
	},
};

type CardMode = "default" | "compact" | "super-compact";

export function AppItem({
	mode = "default",
	name = "hello",
	description = "",
	orientation = "top",
	tags = [],
	link,
	videoLink,
	delay = 0,
	colSpan,
	rowSpan,
	...props
}: AppCardProps) {
	const isCompact = mode === "compact" || mode === "super-compact";
	const isSuperCompact = mode === "super-compact";

	return (
		<BentoGridItem
			{...props}
			colSpan={colSpan}
			rowSpan={rowSpan}
			className={`flex ${
				orientation === "top" ? "flex-col" : "flex-row"
			} ${
				isCompact
					? "p-3 gap-2"
					: "2xl:p-7 gap-3 sm:gap-4 2xl:gap-4"
			}`}
		>
			{(delay: number) => (
				<>
					{rowSpan === 2 && (
						<motion.div
							initial="initial"
							animate="animate"
							variants={mediaVariants}
							custom={{ delay }}
							className={`text-transparent rounded-[12px] w-full bg-cover bg-center bg-no-repeat ${
								isCompact ? "h-48" : "h-1/2"
							}`}
							style={{
								backgroundImage: `url(${getPattern(
									name,
									colSpan as patternLen
								)})`,
							}}
						/>
          )}
					{isSuperCompact && (
						<motion.div
							initial="initial"
							animate="animate"
							variants={mediaVariants}
							custom={{ delay }}
							className={`text-transparent rounded-[12px] w-full bg-cover bg-center bg-no-repeat h-14`}
							style={{
								backgroundImage: `url(${getPattern1R(
									name,
									(colSpan as number ) * 2  as patternLen
								)})`,
							}}
						/>
					)}

					{rowSpan !== 2 &&
						(colSpan as number) >= 2 &&
						orientation !== "top" && (
							<motion.div
								initial="initial"
								animate="animate"
								variants={mediaVariants}
								custom={{ delay }}
								className={`text-transparent rounded-[12px] bg-cover bg-center bg-no-repeat shrink-0 ${
									isCompact
										? "w-1/4 h-full"
										: "w-1/3 h-full"
								}`}
								style={{
									backgroundImage: `url(${getPattern(
										name,
										Math.floor(
											(colSpan as number) / 2
										) as patternLen
									)})`,
								}}
							/>
						)}

					<motion.div
						initial="initial"
						animate="animate"
						className={`flex flex-col ${
							isCompact ? "gap-2" : "gap-4"
						}`}
					>
						{tags.length > 0 && !isSuperCompact && (
							<div className="flex gap-2 flex-wrap">
								{tags.map((value, index) => (
									<motion.div
										key={value}
										variants={tagVariants}
										custom={{
											delay:
												delay +
												index *
													(isCompact
														? 0.04
														: 0.08) +
												0.5,
										}}
										className={`rounded-[12px] text-black ${
											isCompact
												? "px-1.5 py-0.5 text-xs"
												: "px-2 py-1"
										}`}
										style={{
											backgroundColor:
												getPastelColor(value),
										}}
									>
										{value}
									</motion.div>
								))}
							</div>
						)}

						<motion.div
							variants={contentVariants}
							custom={{
								delay:
									delay +
									(isSuperCompact
										? 0
										: tags.length *
										  (isCompact ? 0.04 : 0.08)),
							}}
							className="flex justify-between items-center gap-2"
						>
							<h1
								className={`font-sans underline tracking-wide ${
									isCompact
										? "text-xl"
										: "text-3xl"
								}`}
							>
								{name}
							</h1>

							<div className="flex gap-2">
								{videoLink && (
									<motion.a
										data-cursor="pointer-invert"
										variants={buttonVariants}
										custom={{
											delay: delay + 0.2,
										}}
										href={videoLink}
										target="_blank"
										rel="noopener noreferrer"
										className={`inline-flex items-center gap-1 rounded-[10px] bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition ${
											isCompact
												? "px-2 py-1 text-xs"
												: "px-4 py-2 text-sm"
										}`}
									>
										{isCompact ? "Video" : "Video Demo"}
										<ArrowUpRightIcon
											size={isCompact ? 16 : 22}
										/>
									</motion.a>
								)}

								{link && (
									<motion.a
										data-cursor="pointer-invert"
										variants={buttonVariants}
										custom={{
											delay: delay + 0.3,
										}}
										href={link}
										target="_blank"
										rel="noopener noreferrer"
										className={`inline-flex items-center gap-1 rounded-[10px] bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition ${
											isCompact
												? "px-2 py-1 text-xs"
												: "px-4 py-2 text-sm"
										}`}
									>
										Visit
										<ArrowUpRightIcon
											size={isCompact ? 16 : 22}
										/>
									</motion.a>
								)}
							</div>
						</motion.div>

						{description && (
							<motion.p
								variants={contentVariants}
								custom={{
									delay: delay + 0.45,
								}}
								className={`text-muted-foreground ${
									isCompact
										? "text-xs line-clamp-2"
										: "text-sm"
								}`}
							>
								{description}
							</motion.p>
						)}
					</motion.div>
				</>
			)}
		</BentoGridItem>
	);
}
