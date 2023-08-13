// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx
import { ImageResponse } from "next/server"

export const runtime = "edge"
// Image metadata
export const alt = "Jeff Huang | jzxhuang"
export const size = { width: 1200, height: 630 }

export default async function Image() {
  // Font
  const openSansFontPromise = fetch(new URL("../assets/fonts/open-sans/OpenSans-Semibold.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer()
  )

  // https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-examples#using-a-local-image
  const imageData = await fetch(new URL("../assets/images/headshot.png", import.meta.url)).then((res) =>
    res.arrayBuffer()
  )

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
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          style={{ marginBottom: 32 }}
          // src="https://s3.amazonaws.com/jzxhuang.com/headshot.png"
          // @ts-expect-error - imageData is an ArrayBuffer but can be assigned to img src for OG image generation
          src={imageData}
          height={320}
          width={320}
        />
        <p style={{ margin: 0 }}>Jeff Huang</p>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Open Sans",
          data: await openSansFontPromise,
          style: "normal",
          weight: 400,
        },
      ],
    }
  )
}
