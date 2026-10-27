import React from "react"
import images from "../../.generated/images.json"

export default function OptimizedImage({
  src,
  width,
  alt,
  style,
  imageStyle,
  quality,
  className,
  loading = "lazy",
}) {
  const name = src.split("/").pop()
  const image = images[name]
  if (!image || image.width !== width || image.quality !== quality) {
    throw new Error(
      `Missing or stale optimized image: ${name}. Run npm run assets.`
    )
  }

  return (
    <span
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-block",
        verticalAlign: "top",
        maxWidth: width,
        ...style,
      }}
    >
      <picture>
        <source type="image/avif" srcSet={image.avif} sizes={image.sizes} />
        <source type="image/webp" srcSet={image.webp} sizes={image.sizes} />
        <img
          src={image.src}
          srcSet={image.fallback}
          sizes={image.sizes}
          width={image.width}
          height={image.height}
          alt={alt}
          loading={loading}
          decoding="async"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            ...imageStyle,
          }}
        />
      </picture>
    </span>
  )
}
