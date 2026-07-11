"use client";

import Image from "next/image";
import { EnvelopeClosedIcon, GitHubLogoIcon, GlobeIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { useMemo, useState } from "react";
import { BentoGridItem } from "./bento";
import { Switch } from "./animate-ui/components/radix/switch";
import { Sun } from "./animate-ui/icons/sun";
import { Moon } from "./animate-ui/icons/moon";
import { Shine } from "./animate-ui/primitives/effects/shine";
import { Marquee } from "./marquee";
import {
	HoverCard,
	HoverCardContent,
	HoverCardPortal,
	HoverCardTrigger,
} from "./animate-ui/primitives/radix/hover-card";

import type { TechItem } from "./MobileTechModal";
import { PlanetIcon, QuotesIcon, XIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";

type CardMode = "default" | "compact";
type BentoCardProps = Record<string, unknown> & {
	mode?: CardMode;
	onItemClick?: (item: TechItem) => void;
};

const socialLinks = [
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/jasn-rathore-884644256/",
		className:
			"hover:bg-sky-500 hover:text-white dark:transition-none group",
		Icon: LinkedInLogoIcon,
		rotate: 5,
	},
	{
		label: "GitHub",
		href: "https://www.github.com/JasnRathore",
		className:
			"hover:bg-indigo-600 hover:text-white dark:transition-none group dark:hover:bg-indigo-400 dark:hover:text-slate-950",
		Icon: GitHubLogoIcon,
		rotate: -5,
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/killermarine_studios/",
		className:
			"hover:bg-pink-500 hover:text-white dark:transition-none group",
		Icon: InstagramLogoIcon,
		rotate: -5,
	},
	{
		label: "Email",
		href: "mailto:jasn.p.rathore@gmail.com",
		className:
			"hover:bg-red-500 hover:text-white dark:transition-none group",
		Icon: EnvelopeClosedIcon,
		rotate: 5,
	},
] as const;


const socialLinks2 = [
	{
		label: "Website",
		href: "https://jasnrathore.fun",
		className:
			"hover:bg-lime-300 hover:text-black dark:transition-none group",
		Icon: PlanetIcon,
		rotate: 5,
	},
	{
		label: "Blog",
		href: "https:/jasnrathore.fun/blog",
		className:
			"hover:bg-amber-300 hover:text-black dark:transition-none group ",
		Icon: QuotesIcon,
		rotate: -5,
	},

] as const;

export const languages = [
	{
		alt: "JavaScript",
		src: "/lang/js.svg",
		description: "Dynamic, versatile language for the web.",
		category: "Scripting",
		level: "Advanced",
	},
	{
		alt: "TypeScript",
		src: "/lang/ts.svg",
		description: "Typed superset of JavaScript.",
		category: "Scripting",
		level: "Advanced",
	},
	{
		alt: "Python",
		src: "/lang/py.svg",
		description: "High-level language for general purpose programming.",
		category: "General",
		level: "Advanced",
	},
	{
		alt: "Rust",
		src: "/lang/rs.svg",
		description: "Systems programming language focused on safety.",
		category: "Systems",
		level: "Advanced",
	},
	{
		alt: "MySQL",
		src: "/lang/mysql.svg",
		description: "Popular open-source relational database.",
		category: "Database",
		level: "Intermediate",
	},
	{
		alt: "Go",
		src: "/lang/go.svg",
		description: "Efficient language for scalable systems.",
		category: "Systems",
		level: "Intermediate",
	},
] as const;

export const technologies = [
	{
		alt: "Next.js",
		src: "/tech/next-js.svg",
		rotate: "rotate-[-3deg]",
		description: "React framework for full-stack web apps.",
		category: "Full stack",
		level: "Advanced",
	},
	{
		alt: "React",
		src: "/tech/react.svg",
		rotate: "rotate-[2deg]",
		description: "Component-based UI library.",
		category: "Frontend",
		level: "Advanced",
	},
	{
		alt: "Tailwind CSS",
		src: "/tech/tailwind.svg",
		rotate: "rotate-[-2deg]",
		description: "Utility-first CSS framework.",
		category: "Styling",
		level: "Advanced",
	},
	{
		alt: "Tauri",
		src: "/tech/tauri.svg",
		rotate: "rotate-[3deg]",
		description: "Rust-powered desktop app framework.",
		category: "Desktop",
		level: "Intermediate",
	},
	{
		alt: "Node.js",
		src: "/tech/node.svg",
		rotate: "rotate-[-1deg]",
		description: "JavaScript runtime for backend apps.",
		category: "Backend",
		level: "Advanced",
	},
	{
		alt: "Figma",
		src: "/tech/figma.svg",
		rotate: "rotate-[2deg]",
		description: "Collaborative UI/UX design tool.",
		category: "Design",
		level: "Advanced",
	},
] as const;

const buttonVariants = {
	initial: {
		scale: 0,
		opacity: 0,
		y: 20,
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

const iconVariants = {
	initial: {
		scale: 0.8,
		opacity: 0,
	},
	animate: {
		scale: 1,
		opacity: 1,
	},
	hover: (custom: { rotate: number }) => ({
		scale: 1.2,
		rotate: custom.rotate,
		transition: {
			type: "spring" as const,
			stiffness: 400,
			damping: 17,
		},
	}),
};

export function ThemeControl({ mode = "default", ...props }: BentoCardProps) {
	const [mounted, setMounted] = React.useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	React.useEffect(() => {
		const timer = setTimeout(() => setMounted(true), 0);
		return () => clearTimeout(timer);
	}, []);

	const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

	if (!mounted) {
		return (
			<BentoGridItem {...props} className="flex items-center justify-center" />
		);
	}

	return (
		<BentoGridItem {...props} className="flex items-center justify-center">
			<Switch
				data-cursor="pointer"
				checked={isDark}
				onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
				thumbIcon={
					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={isDark ? "moon" : "sun"}
							initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
							animate={{ scale: 1, opacity: 1, rotate: 0 }}
							exit={{ scale: 0.5, opacity: 0, rotate: -90 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
							className="flex items-center justify-center"
						>
							{isDark ? <Moon animate /> : <Sun animate />}
						</motion.div>
					</AnimatePresence>
				}
				startIcon={<Sun />}
				endIcon={<Moon />}
				className={
					mode === "compact"
						? "h-[44px] w-[84px] border-none bg-zinc-200 p-1 shadow-none data-[state=checked]:bg-zinc-700 dark:bg-zinc-800 dark:data-[state=checked]:bg-zinc-600"
						: "h-[48px] w-[96px] border-none bg-zinc-200 p-1 shadow-none data-[state=checked]:bg-zinc-700 dark:bg-zinc-800 dark:data-[state=checked]:bg-zinc-600"
				}
				thumbClassName={
					mode === "compact"
						? "size-[38px] bg-white dark:bg-zinc-200"
						: "size-[42px] bg-white dark:bg-zinc-200"
				}
				iconClassName="[&_svg]:size-6 text-zinc-600 dark:text-zinc-200"
				startIconClassName="[&_svg]:size-4 left-4 text-zinc-400 dark:text-zinc-400"
				endIconClassName="[&_svg]:size-4 right-4 text-zinc-500 dark:text-zinc-400"
				pressedWidth={mode === "compact" ? 40 : 45}
			/>
		</BentoGridItem>
	);
}

export function Links({ mode = "default", ...props }: BentoCardProps) {
	return (
		<BentoGridItem
			{...props}
			className={
				mode === "compact"
					? "!p-0 grid grid-cols-2 grid-rows-2 gap-2 border-none overflow-visible rounded-none bg-transparent shadow-none hover:shadow-none h-full"
					: "!p-0 grid grid-cols-2 gap-1.5 border-none overflow-visible rounded-none bg-transparent shadow-none hover:shadow-none"
			}
		>
			{(delay: number) => (
				<>
					{socialLinks.map((link, index) => {
						const Icon = link.Icon;

						return (
							<motion.a
								key={link.label}
								initial="initial"
								animate="animate"
								href={link.href}
								className={`flex items-center justify-center border border-border bg-card transition-colors duration-500 ${link.className} ${
									mode === "compact"
										? "h-full rounded-[22px]"
										: "rounded-[24px]"
								}`}
								variants={buttonVariants}
								whileHover="hover"
								custom={{ delay: delay + index * 0.15, rotate: link.rotate }}
								data-cursor="social"
							>
								<motion.div
									variants={iconVariants}
									custom={{ delay: delay + index * 0.15, rotate: link.rotate }}
									className="flex items-center justify-center"
								>
									<Icon className="size-7 sm:size-8 2xl:size-14" />
								</motion.div>
							</motion.a>
						);
					})}
				</>
			)}
		</BentoGridItem>
	);
}


export function Links2({ mode = "default", ...props }: BentoCardProps) {
	return (
		<BentoGridItem
			{...props}
			className={
				mode === "compact"
					? "!p-0 grid grid-cols-1 grid-rows-2 gap-2 border-none overflow-visible rounded-none bg-transparent shadow-none hover:shadow-none h-full"
					: "!p-0 grid grid-cols-1 gap-1.5 border-none overflow-visible rounded-none bg-transparent shadow-none hover:shadow-none"
			}
		>
			{(delay: number) => (
				<>
					{socialLinks2.map((link, index) => {
						const Icon = link.Icon;

						return (
							<motion.a
								key={link.label}
								initial="initial"
								animate="animate"
								href={link.href}
								className={`flex items-center justify-center border border-border bg-card transition-colors duration-500 ${link.className} ${
									mode === "compact"
										? "h-full rounded-[22px]"
										: "rounded-[24px]"
								}`}
								variants={buttonVariants}
								whileHover="hover"
								custom={{ delay: delay + index * 0.15, rotate: link.rotate }}
								data-cursor="social"
              >
                <div className="flex flex-row items-center justify-start gap-5 w-full m-3 md:m-5 lg:m-6">
								<motion.div
									variants={iconVariants}
									custom={{ delay: delay + index * 0.15, rotate: link.rotate }}
									className="flex items-center justify-center gap-2"
								>
                  <Icon className="size-7 sm:size-8 2xl:size-14" />
                  </motion.div>
                   <p className="md:text-xl 2xl:text-2xl">{ link.label}</p>
                </div>
							</motion.a>
						);
					})}
				</>
			)}
		</BentoGridItem>
	);
}
export function Languages({ mode = "default", onItemClick, ...props }: BentoCardProps) {
	const [isHoveringCard, setIsHoveringCard] = useState(false);

	if (mode === "compact") {
		return (
			<BentoGridItem
				{...props}
				className="flex items-center overflow-hidden !px-2 !py-1.5 sm:!px-3 sm:!py-2"
			>
				<Marquee
					speed="normal"
					className="w-full"
					fade={true}
					gap="12px"
					autoFill
				>
					{languages.map((lang) => (
						<div
							key={lang.alt}
							className="relative cursor-pointer"
							onClick={() => onItemClick?.(lang)}
						>
							<Shine
								className="relative flex aspect-square h-24 items-center justify-center overflow-hidden rounded-[22px] border border-border/40 bg-muted transition-transform active:scale-95 2xl:h-32"
								delay={3}
								enableOnHover={false}
							>
								<Image
									fill
									alt={lang.alt}
									src={lang.src}
									className="object-contain p-4"
								/>
							</Shine>
						</div>
					))}
					<div></div>
				</Marquee>
			</BentoGridItem>
		);
	}

	return (
		<BentoGridItem
			{...props}
			className="flex items-center overflow-hidden px-2 py-4 2xl:px-4 2xl:py-6"
		>
			<Marquee
				speed="normal"
				className="w-full"
				fade={true}
				gap="12px"
				autoFill
				pauseOnHover={!isHoveringCard}
				play={!isHoveringCard}
			>
				{languages.map((lang) => (
					<div
						key={lang.alt}
						onMouseEnter={() => setIsHoveringCard(true)}
						onMouseLeave={() => setIsHoveringCard(false)}
						data-cursor="view"
					>
						<HoverCard openDelay={100}>
							<HoverCardTrigger asChild>
								<Shine
									className="relative flex aspect-square h-16 items-center justify-center overflow-hidden rounded-[16px] border border-border/40 bg-muted transition-all duration-300 hover:scale-105 hover:border-border 2xl:h-24"
									delay={3}
									enableOnHover={true}
								>
									<Image
										fill
										alt={lang.alt}
										className="object-contain p-3"
										src={lang.src}
									/>
								</Shine>
							</HoverCardTrigger>

							<HoverCardPortal>
								<HoverCardContent
									side="top"
									sideOffset={12}
									className="w-72 rounded-[16px] border-2 border-border/50 bg-card p-5 shadow-2xl dark:bg-muted"
								>
									<div className="flex flex-col gap-4">
										<div className="flex items-center gap-4">
											<div className="relative size-14 shrink-0 overflow-hidden rounded-[14px] border border-border/50 bg-muted">
												<Image
													fill
													alt={lang.alt}
													src={lang.src}
													className="object-contain p-3"
												/>
											</div>

											<div className="min-w-0">
												<div className="text-sm font-semibold tracking-tight">
													{lang.alt}
												</div>

												<div className="text-xs text-muted-foreground">
													Programming Language
												</div>
											</div>
										</div>

										<div className="text-sm leading-relaxed text-muted-foreground">
											{lang.description}
										</div>

										<div className="flex items-center gap-6 pt-1">
											<div className="flex flex-col">
												<span className="text-sm font-semibold">
													{lang.category}
												</span>

												<span className="text-xs text-muted-foreground">
													Category
												</span>
											</div>

											<div className="flex flex-col">
												<span className="text-sm font-semibold">
													{lang.level}
												</span>

												<span className="text-xs text-muted-foreground">
													Experience
												</span>
											</div>
										</div>
									</div>
								</HoverCardContent>
							</HoverCardPortal>
						</HoverCard>
					</div>
				))}

				<div></div>
			</Marquee>
		</BentoGridItem>
	);
}

export function Technologies({ mode = "default", onItemClick, ...props }: BentoCardProps) {
	if (mode === "compact") {
		return (
			<BentoGridItem
				{...props}
				className="flex items-center overflow-hidden !px-2 !py-1.5 sm:!px-3 sm:!py-2"
			>
				<Marquee
					speed="normal"
					className="w-full"
					fade={true}
					gap="12px"
					autoFill
				>
					{technologies.map((tech) => (
						<div
							key={tech.alt}
							className="relative cursor-pointer"
							onClick={() => onItemClick?.(tech)}
						>
							<Shine
								className="relative flex aspect-square h-24 items-center justify-center overflow-hidden rounded-[22px] border border-border/40 bg-muted transition-transform active:scale-95 2xl:h-32"
								delay={3}
								enableOnHover={false}
							>
								<Image
									fill
									alt={tech.alt}
									src={tech.src}
									className="object-contain p-4"
								/>
							</Shine>
						</div>
					))}
					<div></div>
				</Marquee>
			</BentoGridItem>
		);
	}

	return (
		<BentoGridItem {...props} className="flex items-center justify-center">
			<div className="grid grid-cols-3 gap-3">
				{technologies.map((tech) => (
					<HoverCard key={tech.alt} openDelay={100}>
						<HoverCardTrigger asChild>
							<Shine
								className={`relative flex aspect-square h-16 items-center justify-center overflow-hidden rounded-[18px] border border-border/40 bg-muted text-foreground transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-border 2xl:h-20 ${tech.rotate}`}
								delay={3}
								enableOnHover={true}
							>
								<div data-cursor="view" className="absolute inset-0 z-10" />
								<Image
									fill
									alt={tech.alt}
									className="object-contain p-3"
									src={tech.src}
								/>
							</Shine>
						</HoverCardTrigger>

						<HoverCardPortal>
							<HoverCardContent
								side="top"
								sideOffset={12}
								className="w-72 rounded-[16px] border-2 border-border/50 bg-card p-5 shadow-2xl dark:bg-muted"
							>
								<div className="flex flex-col gap-4">
									<div className="flex items-center gap-4">
										<div className="relative size-14 shrink-0 overflow-hidden rounded-[14px] border border-border/50 bg-muted">
											<Image
												fill
												alt={tech.alt}
												src={tech.src}
												className="object-contain p-3"
											/>
										</div>

										<div className="min-w-0">
											<div className="text-sm font-semibold tracking-tight">
												{tech.alt}
											</div>

											<div className="text-xs text-muted-foreground">
												Core Technology
											</div>
										</div>
									</div>

									<div className="text-sm leading-relaxed text-muted-foreground">
										{tech.description}
									</div>

									<div className="flex items-center gap-6 pt-1">
										<div className="flex flex-col">
											<span className="text-sm font-semibold">
												{tech.category}
											</span>

											<span className="text-xs text-muted-foreground">
												Category
											</span>
										</div>

										<div className="flex flex-col">
											<span className="text-sm font-semibold">
												{tech.level}
											</span>

											<span className="text-xs text-muted-foreground">
												Experience
											</span>
										</div>
									</div>
								</div>
							</HoverCardContent>
						</HoverCardPortal>
					</HoverCard>
				))}
			</div>
		</BentoGridItem>
	);
}
