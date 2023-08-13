import { ImageResponse } from "@vercel/og"

export const config = {
  runtime: "edge",
}

// Make sure the font exists in the specified path:
const openSansFontPromise = fetch(
  new URL("../../../assets/fonts/open-sans/OpenSans-Semibold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler() {
  const openSansFont = await openSansFontPromise
  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "Open Sans",
          fontSize: 64,
          fontWeight: 600,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{ paddingBottom: 32 }}
          src="https://s3.amazonaws.com/jzxhuang.com/headshot.png"
          height={320}
          width={320}
          alt="headshot"
        />
        <p style={{ margin: 0 }}>Jeff Huang</p>
      </div>
    ),
    {
      fonts: [
        {
          name: "Open Sans",
          data: openSansFont,
          style: "normal",
        },
      ],
    }
  )
}
