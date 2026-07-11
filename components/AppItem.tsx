import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { BentoGridItem, BentoGridItemProps } from "./bento";
import { getPastelColor, type patternLen, getPattern } from "@/lib/design";

type CardMode = "default" | "compact";

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
	return (
		<BentoGridItem
			{...props}
			colSpan={colSpan}
			rowSpan={rowSpan}
			className={`flex ${
				orientation === "top" ? "flex-col" : "flex-row"
			} 2xl:p-7 gap-3 sm:gap-4 2xl:gap-4`}
		>
      {(delay: number) => (
			<>
			{rowSpan === 2 && (
				<motion.div
					initial="initial"
					animate="animate"
					variants={mediaVariants}
					custom={{ delay }}
					className="text-transparent rounded-[12px] w-full h-1/2 bg-cover bg-center bg-no-repeat"
					style={{
						backgroundImage: `url(${getPattern(
							name,
							colSpan as patternLen
						)})`,
					}}
				>
					d
				</motion.div>
			)}

			{rowSpan !== 2 &&
			(colSpan as number) >= 2 &&
			orientation !== "top" && (
				<motion.div
					initial="initial"
					animate="animate"
					variants={mediaVariants}
					custom={{ delay }}
					className="text-transparent rounded-[12px] w-1/3 h-full bg-cover bg-center bg-no-repeat shrink-0"
					style={{
						backgroundImage: `url(${getPattern(
							name,
							Math.floor((colSpan as number) / 2) as patternLen
						)})`,
					}}
				>
					d
				</motion.div>
			)}

			<motion.div
				initial="initial"
				animate="animate"
				className="flex flex-col gap-4"
			>
				<div className="flex gap-3">
					{tags.map((value, index) => (
						<motion.div
							key={value}
							variants={tagVariants}
							custom={{
								delay: delay + index * 0.08 + 0.5,
							}}
							className="px-2 py-1 rounded-[12px] text-black"
							style={{
								backgroundColor: getPastelColor(value),
							}}
						>
							{value}
						</motion.div>
					))}
				</div>

				<motion.div
					variants={contentVariants}
					custom={{
						delay: delay + tags.length * 0.08,
					}}
					className="flex justify-between"
				>
					<h1 className="text-3xl font-sans underline tracking-wide">
						{name}
					</h1>

					<div className="flex gap-3">
						{videoLink && (
							<motion.a
							data-cursor="pointer-invert"
								variants={buttonVariants}
								custom={{
									delay: delay + 0.25,
								}}
								href={videoLink}
								target="_blank"
                    rel="noopener noreferrer"
                    							className="inline-flex items-center gap-2 rounded-[10px] bg-black dark:bg-white px-4 py-2 text-sm text-white dark:text-black hover:transition-scale duration-75 ease-out hover:scale-105"
							>
								Video Demo <ArrowUpRightIcon size={22} />
							</motion.a>
						)}

						{link && (
                  <motion.a
                    data-cursor="pointer-invert"
								variants={buttonVariants}
								custom={{
									delay: delay + 0.35,
								}}
								href={link}
								target="_blank"
								rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] bg-black dark:bg-white px-4 py-2 text-sm text-white dark:text-black hover:transition-scale duration-75 ease-out hover:scale-105"
                  >
								Visit <ArrowUpRightIcon size={22} />
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
						className="text-sm text-muted-foreground"
					>
						{description}
					</motion.p>
				)}
			</motion.div> </>)}
		</BentoGridItem>
	);
}
