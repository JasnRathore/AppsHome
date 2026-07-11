"use client"

import { DownloadSimple } from "@phosphor-icons/react"
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { BentoGrid, BentoGridItem } from "./bento"
import {
  Blog,
  Gallery,
  Intro,
  Pfp,
  Profile,
  Projects,
  Resume,
} from "./bento-items"
import { Plus } from "./animate-ui/icons/plus"
import {
  Links,
  Links2,
  Technologies,
  ThemeControl,
  Languages,
  languages,
  technologies,
} from "./bento-items-2"
import { Marquee } from "./marquee"
import MobileHeader from "./MobileHeader"
import { MobileTechModal, type TechItem } from "./MobileTechModal"
import { sitePaths } from "@/lib/site"
import * as React from "react"
import { AppItem } from "./AppItem"

const mobileLinks = [
  {
    href: "https://www.linkedin.com/in/jasn-rathore-884644256/",
    label: "LinkedIn",
    Icon: LinkedInLogoIcon,
  },
  {
    href: "https://www.github.com/JasnRathore",
    label: "GitHub",
    Icon: GitHubLogoIcon,
  },
  {
    href: "https://www.instagram.com/killermarine_studios/",
    label: "Instagram",
    Icon: InstagramLogoIcon,
  },
  {
    href: "mailto:jasn.p.rathore@gmail.com",
    label: "Email",
    Icon: EnvelopeClosedIcon,
  },
] as const

function Mobile2XNotesLayout() {
  const [selectedTech, setSelectedTech] = React.useState<TechItem | null>(null)

  return (
    <div className="min-h-screen bg-mobile-bg text-mobile-text md:hidden">
      <div className="mx-auto w-full max-w-[390px] px-3 pt-2 pb-6 font-mono sm:px-4">
        <MobileHeader page="home" />
        <div className="mt-5 grid grid-cols-2 gap-4">
          <Link
            href={sitePaths.projects}
            className="flex aspect-square flex-col items-center justify-center gap-6 rounded-[2rem] border border-transparent bg-mobile-coral p-5 text-black"
          >
            <h2 className="text-[1.6rem] leading-[1.05] font-semibold tracking-[-0.05em]">
              Projects
            </h2>
            <span className="inline-flex items-center text-[4rem] leading-[0.9] font-bold tracking-[-0.08em]">
              6
              <Plus
                animateOnView
                loopDelay={5000}
                loop
                className="size-7 sm:size-8"
              />
            </span>
          </Link>

          <Link
            href={sitePaths.designs}
            className="flex aspect-square flex-col justify-between overflow-clip rounded-[2rem] border border-transparent bg-mobile-yellow text-mobile-text"
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/pfp.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </Link>

          <div className="col-span-2 flex items-center justify-between gap-4 rounded-[1.9rem] border border-mobile-border bg-mobile-surface px-[1.2rem] py-4 backdrop-blur-md">
            <div className="min-w-0">
              <p className="text-[0.7rem] tracking-[0.24em] text-mobile-text-soft uppercase">
                Resume
              </p>
              <p className="mt-1 text-[2rem] leading-none font-semibold tracking-[-0.05em] text-mobile-text">
                Jasn Rathore
              </p>
            </div>
            <a
              href="/JASN_RATHORE_RESUME_2026_V5.pdf"
              download={true}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-mobile-text text-mobile-bg transition-transform active:scale-95"
            >
              <DownloadSimple size={26} weight="bold" />
            </a>
          </div>

          <div className="col-span-2">
            <div className="grid grid-cols-4 gap-3">
              {mobileLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="flex aspect-square items-center justify-center rounded-[1.25rem] border border-mobile-border bg-mobile-surface-strong text-mobile-text transition-colors hover:bg-mobile-surface active:scale-95"
                  aria-label={label}
                >
                  <Icon className="h-8 w-8" />
                </a>
              ))}
            </div>
          </div>

          <div className="relative col-span-2 overflow-clip">
            <div className="absolute top-0 left-0 z-10 h-full w-1/6 bg-gradient-to-r from-mobile-bg"></div>
            <div className="absolute top-0 right-0 z-10 h-full w-1/6 bg-gradient-to-l from-mobile-bg"></div>
            <Marquee speed="normal" className="w-full" gap="12px" autoFill>
              {languages.map((lang) => (
                <div
                  key={lang.alt}
                  onClick={() => setSelectedTech(lang)}
                  className="relative flex aspect-square h-16 cursor-pointer items-center justify-center overflow-hidden rounded-[1.1rem] border border-mobile-border bg-mobile-surface-strong"
                >
                  <Image
                    fill
                    alt={lang.alt}
                    src={lang.src}
                    className="object-contain p-3"
                  />
                </div>
              ))}
              <div></div>
            </Marquee>
          </div>
          <span className="col-span-2 text-center text-sm text-mobile-text-soft">
            Tap any{" "}
            <span className="font-medium text-mobile-coral underline">
              Icon
            </span>{" "}
            to view it&apos;s details.
          </span>
          <div className="relative col-span-2 overflow-clip">
            <div className="absolute top-0 left-0 z-10 h-full w-1/6 bg-gradient-to-r from-mobile-bg"></div>
            <div className="absolute top-0 right-0 z-10 h-full w-1/6 bg-gradient-to-l from-mobile-bg"></div>
            <Marquee
              speed="normal"
              className="w-full"
              reverse
              gap="12px"
              autoFill
            >
              {technologies.map((lang) => (
                <div
                  key={lang.alt}
                  onClick={() => setSelectedTech(lang)}
                  className="relative flex aspect-square h-16 cursor-pointer items-center justify-center overflow-hidden rounded-[1.1rem] border border-mobile-border bg-mobile-surface-strong"
                >
                  <Image
                    fill
                    alt={lang.alt}
                    src={lang.src}
                    className="object-contain p-3"
                  />
                </div>
              ))}
              <div></div>
            </Marquee>
          </div>
        </div>
      </div>
      <MobileTechModal
        selectedTech={selectedTech}
        onClose={() => setSelectedTech(null)}
      />
    </div>
  )
}

export function Max() {
  return (
    <div>
    <div className="hidden h-screen w-full bg-background p-4 font-mono text-foreground xl:flex 2xl:p-6 pb-3 2xl:pb-3">
      <BentoGrid
        cols={6}
        gap={3}
        className="h-full w-full max-w-full"
        rowHeight="1fr"
      >
        {/* Row 1 */}
        <AppItem name={"Appointley"} tags={["Web","Docker", "SpringBoot", "PostgreSQL", "NodeMailer"]} videoLink="sd" link="https://appointley.vercel.app/" description="A toy scheduling platform that enables users to manage bookings, set recurring availability, coordinate team workflows, and automate appointment reminders. It demonstrates core scheduling features such as appointment management, availability handling, and conflict-free coordination.
" orientation="top" colSpan={3} rowSpan={2} />
        <ThemeControl colSpan={1} rowSpan={1} />
        <Intro colSpan={2} rowSpan={1} />

        <AppItem name="FolioPage" tags={["Web", "Service", "NextJS", "Turso"]} videoLink="sd" link="https://foliopage.vercel.app" description="An actively developed portfolio platform for students and early-career developers, focused on simplifying the creation and showcasing of professional profiles with zero-cost hosting and minimal setup." colSpan={2} rowSpan={2} />
        <Links colSpan={1} rowSpan={1} />
        <AppItem name={"MonkTimer "} tags={["Productivity", "Web", "Vite"]} link="https://monktimer.vercel.app/" description="An ad-free productivity timer for students, inspired by Zhenya Rynzhuk, designed to help users stay focused & manage study sessions." orientation="left" colSpan={3} rowSpan={1} />
        <Links2 colSpan={1} rowSpan={1} />

      </BentoGrid>
      </div>

      <div className="hidden h-[70vh] w-full bg-background p-4 font-mono text-foreground xl:flex 2xl:p-6 pt-0  2xl:pt-0">
        <BentoGrid
          cols={6}
          gap={3}
          className="h-full w-full max-w-full"
          rowHeight="1fr"
        >
          {/* Row 1 */}
          <AppItem name={"Su-Fumi"} tags={["Web","Docker", "SpringBoot", "PostgreSQL", "NodeMailer"]} link="https://sufumi.vercel.app" description="A venture focused on building CLI tools that streamline developer workflows and improve productivity with modern web technologies." orientation="top" colSpan={3} rowSpan={2} />

        </BentoGrid>
        </div>
    </div>
  )
}

export function Mid() {
  const [selectedTech, setSelectedTech] = React.useState<TechItem | null>(null)

  return (
    <div className="hidden min-h-screen w-full bg-background px-4 py-4 font-mono text-foreground md:flex lg:px-5 lg:py-5 xl:hidden">
      <BentoGrid
        cols={4}
        gap={3}
        className="h-full w-full max-w-full"
        rowHeight={{ base: "156px", lg: "170px" }}
      >
        <Intro colSpan={3} rowSpan={1} mode="compact" />
        <Pfp colSpan={1} rowSpan={1} mode="compact" />

        <Links colSpan={1} rowSpan={1} mode="compact" />
        <Projects colSpan={1} rowSpan={1} mode="compact" />
        <ThemeControl colSpan={1} rowSpan={1} mode="compact" />
        <Resume colSpan={1} rowSpan={1} mode="compact" />

        <Gallery colSpan={4} rowSpan={1} mode="compact" />

        <div className="col-span-4 flex flex-col gap-3 !overflow-visible">
          <div className="flex justify-center py-1">
            <span className="text-center text-sm text-mobile-text-soft">
              Tap any{" "}
              <span className="font-medium text-mobile-coral underline">
                Icon
              </span>{" "}
              to view it&apos;s details.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 !overflow-visible">
            <Languages
              colSpan={1}
              rowSpan={1}
              mode="compact"
              onItemClick={setSelectedTech}
            />
            <Technologies
              colSpan={1}
              rowSpan={1}
              mode="compact"
              onItemClick={setSelectedTech}
            />
          </div>
        </div>
      </BentoGrid>
      <MobileTechModal
        selectedTech={selectedTech}
        onClose={() => setSelectedTech(null)}
      />
    </div>
  )
}

export function Mobile2X() {
  return <Mobile2XNotesLayout />
}
