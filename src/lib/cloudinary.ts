/**
 * Lightweight Cloudinary helper — no SDK needed for read-time URL building,
 * which keeps the client bundle small. Once real product photography is
 * uploaded (see README "Images & Cloudinary"), swap <ProductImage> for an
 * <Image src={cloudinaryUrl(publicId)}> using next/image.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "thumb" | "pad";
  quality?: "auto" | number;
  format?: "auto" | "webp" | "avif";
}

export function cloudinaryUrl(publicId: string, options: CloudinaryTransformOptions = {}) {
  if (!CLOUD_NAME) {
    throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set — see .env.example.");
  }

  const { width, height, crop = "fill", quality = "auto", format = "auto" } = options;

  const transforms = [
    `q_${quality}`,
    `f_${format}`,
    crop && `c_${crop}`,
    width && `w_${width}`,
    height && `h_${height}`,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

/** Config for an unsigned client-side upload widget (product photography intake). */
export function getUploadWidgetConfig() {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!CLOUD_NAME || !uploadPreset) {
    throw new Error("Cloudinary upload is not configured — set the Cloudinary env vars in .env.example.");
  }
  return { cloudName: CLOUD_NAME, uploadPreset, sources: ["local", "camera"], multiple: true, folder: "iconnect-products" };
}
