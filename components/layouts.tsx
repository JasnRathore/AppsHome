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
import { PlanetIcon, QuotesIcon } from "@phosphor-icons/react/dist/ssr"

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
  {
    href: "https://jasnrathore.fun",
    label: "website",
    Icon: PlanetIcon,
  },
  {
    href: "https://jasnrathore.fun/blog",
    label: "Blog",
    Icon: QuotesIcon,
  },
] as const

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
        <ThemeControl colSpan={1} rowSpan={1} />
        <AppItem mode="compact" name={"Appointley"} tags={["Web","Docker", "SpringBoot", "PostgreSQL", "NodeMailer"]} videoLink="sd" link="https://appointley.vercel.app/" description="A toy scheduling platform that enables users to manage bookings, set recurring availability, coordinate team workflows, and automate appointment reminders. It demonstrates core scheduling features such as appointment management, availability handling, and conflict-free coordination.
" orientation="top" colSpan={3} rowSpan={2} />
        <Links colSpan={1} rowSpan={1} />
        <Links2 colSpan={1} rowSpan={1} />
        <AppItem name={"MonkTimer "} mode="compact" tags={["Productivity", "Web", "Vite"]} link="https://monktimer.vercel.app/" description="An ad-free productivity timer for students, inspired by Zhenya Rynzhuk, designed to help users stay focused & manage study sessions." orientation="left" colSpan={2} rowSpan={1} />
        <AppItem colSpan={2} rowSpan={2} mode="compact" name="FolioPage" tags={["Web", "Service", "NextJS", "Turso"]} videoLink="sd" link="https://foliopage.vercel.app" description="An actively developed portfolio platform for students and early-career developers, focused on simplifying the creation and showcasing of professional profiles with zero-cost hosting and minimal setup." />
        <AppItem name={"Su-Fumi"} mode="compact" tags={["CLi", "Desktop", "Windows", "Go"]} link="https://sufumi.vercel.app" description="A venture focused on building CLI tools that streamline developer workflows and improve productivity with modern web technologies." orientation="right" colSpan={2} rowSpan={1} />

      </BentoGrid>
      <MobileTechModal
        selectedTech={selectedTech}
        onClose={() => setSelectedTech(null)}
      />
    </div>
  )
}

export function Mobile2X() {
  return (
    <div className="min-h-screen bg-mobile-bg text-mobile-text md:hidden">
      <div className="mx-auto w-full max-w-[390px] px-3 pt-2 pb-6 font-mono sm:px-4">
        <MobileHeader page="home" />
        <div className="mt-5 grid grid-cols-2 gap-4">
          <Intro className="col-span-2" colSpan={2} mode="compact"></Intro>
          <AppItem orientation="top" mode="super-compact" name={"Appointley"} tags={["Web", "Docker", "SpringBoot", "PostgreSQL", "NodeMailer"]} videoLink="sd" link="https://appointley.vercel.app/" description="A toy scheduling platform that enables users to manage bookings, set recurring availability, coordinate team workflows, and automate appointment reminders. It demonstrates core scheduling features such as appointment management, availability handling, and conflict-free coordination." colSpan={2} rowSpan={1} />
          <AppItem name={"MonkTimer "} mode="super-compact" tags={["Productivity", "Web", "Vite"]} link="https://monktimer.vercel.app/" description="An ad-free productivity timer for students, inspired by Zhenya Rynzhuk, designed to help users stay focused & manage study sessions." orientation="top" colSpan={2} rowSpan={1} />
          <AppItem colSpan={2} rowSpan={1} mode="super-compact" name="FolioPage" tags={["Web", "Service", "NextJS", "Turso"]} videoLink="sd" link="https://foliopage.vercel.app" description="An actively developed portfolio platform for students and early-career developers, focused on simplifying the creation and showcasing of professional profiles with zero-cost hosting and minimal setup." />
          <AppItem name={"Su-Fumi"} mode="super-compact" tags={["CLi", "Desktop", "Windows", "Go"]} link="https://sufumi.vercel.app" description="A venture focused on building CLI tools that streamline developer workflows and improve productivity with modern web technologies." orientation="top" colSpan={2} rowSpan={1} />
        </div>
      </div>
    </div>
  )
}

/*

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

*/
