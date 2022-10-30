import Image from "next/image"
import Link from "next/link"
import { memo } from "react"
import { FaGithub, FaInstagram, FaLinkedin, FaRegEnvelope } from "react-icons/fa"

import Headshot from "../../../public/images/headshot.png"
import { ColorThemePicker } from "../color-theme-picker/color-theme-picker"

export const MainCard = memo(function MainCard() {
  return (
    <div
      className="flex flex-col justify-between  w-full md:w-5/6 max-w-xl h-screen md:h-auto min-h-[900px] px-2 py-4 md:rounded-md
      bg-zinc-50 dark:bg-dracula-darker dark:text-dracula-light
      shadow-xl shadow-stone-200 dark:shadow-dracula-darker-800"
    >
      <div className="flex-1 grid gap-12 justify-items-center content-center text-center py-10 px-5">
        <Image
          priority
          width={300}
          height={300}
          src={Headshot}
          alt="Profile picture"
          className="rounded-full w-1/2 max-w-sm"
        />
        <div>
          <h1 className="text-4xl sm:text-5xl dark:text-dracula-green font-normal">Jeff Huang</h1>
          <h2 className="text-lg sm:text-xl pt-1 text-gray-500 dark:text-dracula-pink font-normal">
            Software Engineer
          </h2>
        </div>

        <div className="grid gap-3">
          <p className="px-3 font-light">
            {
              "Hi! I'm passionate about crafting beautiful user experiences and exploring the boundaries of how we interact with the virtual world."
            }
          </p>
          <p className="px-3 font-light">
            {"I'm currently a Software Engineer at "}
            <Link className="underline" href="https://www.spatial.io" target="_blank" rel="noreferrer">
              Spatial
            </Link>
            {
              ". I studied Computer Engineering at the University of Waterloo. In my free time, I snowboard, travel, eat lots of food and drink lots of tea :)"
            }
          </p>
        </div>

        <div className="grid grid-flow-col gap-12 text-indigo-800 dark:text-dracula-purple text-2xl">
          <Link href="https://jzxhuang.medium.com/" target="_blank" rel="noreferrer">
            <h3>Blog</h3>
          </Link>
          <Link href="https://s3.amazonaws.com/jzxhuang.com/resume_jhuang.pdf" target="_blank" rel="noreferrer">
            <h3>Resume</h3>
          </Link>
        </div>
        <SocialButtons />
      </div>

      <footer className="grid justify-center justify-items-center text-gray-400 dark:text-dracula-dark-600 text-sm ">
        <div className="text-center">
          The mouse-tracking effect is implemented using
          <Link
            className="underline pl-1"
            href="https://en.wikipedia.org/wiki/Particle_swarm_optimization"
            target="_blank"
            rel="noreferrer"
          >
            Particle Swarm Optimization.
          </Link>
        </div>

        <div className="grid grid-flow-col justify-center justify-items-center gap-2">
          <Link
            className="underline"
            href="https://github.com/jzxhuang/jzxhuang.github.io"
            target="_blank"
            rel="noreferrer"
          >
            See source code
          </Link>
          <span>|</span>
          <ColorThemePicker />
        </div>
      </footer>
    </div>
  )
})

const socialButtons = [
  { Icon: FaInstagram, url: "https://www.instagram.com/jzxhuang/", label: "Instagram" },
  { Icon: FaGithub, url: "https://github.com/jzxhuang/", label: "Github" },
  { Icon: FaLinkedin, url: "https://www.linkedin.com/in/jzxhuang/", label: "LinkedIn" },
  { Icon: FaRegEnvelope, url: "mailto:jzxhuang@uwaterloo.ca", label: "Email" },
]

export const SocialButtons = memo(function SocialButtons() {
  return (
    <div className="grid gap-6 grid-flow-col ">
      {socialButtons.map((button) => {
        return (
          <Link key={button.url} href={button.url} target="_blank" rel="noreferrer" aria-label={button.label}>
            <button.Icon size={"1.35rem"} />
          </Link>
        )
      })}
    </div>
  )
})
