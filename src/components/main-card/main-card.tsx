import Image from "next/image"
import Link from "next/link"
import { memo } from "react"
import { FaGithub, FaLinkedin, FaRegEnvelope, FaTwitter } from "react-icons/fa"
import Headshot from "@/assets/images/headshot.png"
import { ColorThemePicker } from "../color-theme-picker/color-theme-picker"

export const MainCard = memo(function MainCard() {
  return (
    <div
      className="flex h-screen min-h-[900px]  w-full max-w-xl flex-col justify-between bg-zinc-50 px-2 py-4 shadow-xl shadow-stone-200
      dark:bg-dracula-darker dark:text-dracula-light dark:shadow-dracula-darker-800
      md:h-auto md:w-5/6 md:rounded-md"
    >
      <div className="grid flex-1 content-center justify-items-center gap-12 py-10 px-5 text-center">
        <Image
          priority
          width={300}
          height={300}
          src={Headshot}
          alt="Profile picture"
          className="w-1/2 max-w-sm rounded-full"
        />
        <div>
          <h1 className="text-4xl font-normal dark:text-dracula-green sm:text-5xl">Jeff Huang</h1>
          <h2 className="pt-1 text-lg font-normal text-gray-500 dark:text-dracula-pink sm:text-xl">
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

        <div className="grid grid-flow-col gap-12 text-2xl text-indigo-800 dark:text-dracula-purple">
          <Link href="https://jzxhuang.medium.com/" target="_blank" rel="noreferrer">
            <h3>Blog</h3>
          </Link>
          <Link href="https://s3.amazonaws.com/jzxhuang.com/resume_jhuang.pdf" target="_blank" rel="noreferrer">
            <h3>Resume</h3>
          </Link>
        </div>
        <SocialButtons />
      </div>

      <footer className="grid grid-flow-col items-center justify-center justify-items-center gap-2 px-4 text-sm text-gray-400 dark:text-dracula-dark-600 ">
        <Link
          className="underline"
          href="https://github.com/jzxhuang/jzxhuang.github.io"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </Link>
        <span>|</span>
        <ColorThemePicker />
      </footer>
    </div>
  )
})

const socialButtons = [
  { Icon: FaGithub, url: "https://github.com/jzxhuang/", label: "Github" },
  { Icon: FaLinkedin, url: "https://www.linkedin.com/in/jzxhuang/", label: "LinkedIn" },
  { Icon: FaTwitter, url: "https://twitter.com/jeffzxh/", label: "Twitter" },
  { Icon: FaRegEnvelope, url: "mailto:jzxhuang@uwaterloo.ca", label: "Email" },
]

export const SocialButtons = memo(function SocialButtons() {
  return (
    <div className="grid grid-flow-col gap-6 ">
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
