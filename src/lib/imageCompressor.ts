/**
 * imageCompressor.ts
 *
 * Browser-native image compression utility using the Canvas API.
 * - Preserves original dimensions (no downscaling)
 * - Outputs WebP (best quality/size ratio) with JPEG fallback
 * - Quality: 0.85 (visually lossless for most content)
 * - Max output size guard: if compressed > original, returns original
 * - Zero external dependencies
 */

export interface CompressOptions {
  /** Output quality 0–1. Default: 0.85 */
  quality?: number;
  /** Max width in px. Default: no limit */
  maxWidth?: number;
  /** Max height in px. Default: no limit */
  maxHeight?: number;
  /** Output MIME type. Default: 'image/webp' with 'image/jpeg' fallback */
  outputType?: "image/webp" | "image/jpeg" | "image/png";
}

export interface CompressResult {
  file: File;
  originalSizeKB: number;
  compressedSizeKB: number;
  savedPercent: number;
}

/**
 * Compress a browser File object using the Canvas API.
 * Returns a new File ready to be appended to FormData.
 */
export async function compressImage(
  inputFile: File,
  options: CompressOptions = {},
): Promise<CompressResult> {
  const {
    quality = 0.85,
    maxWidth,
    maxHeight,
    outputType = "image/webp",
  } = options;

  const originalSizeKB = inputFile.size / 1024;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(inputFile);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Scale down if maxWidth / maxHeight provided (preserves aspect ratio)
      if (maxWidth && width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (maxHeight && height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2D context not available"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Try WebP first; some browsers may not support it
      const tryTypes: string[] =
        outputType === "image/webp"
          ? ["image/webp", "image/jpeg"]
          : [outputType];

      const attemptBlob = (types: string[]) => {
        const type = types[0];
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              if (types.length > 1) {
                attemptBlob(types.slice(1));
              } else {
                reject(new Error("Image compression failed"));
              }
              return;
            }

            // If compressed is somehow larger, return original
            const resultFile =
              blob.size >= inputFile.size
                ? inputFile
                : new File(
                    [blob],
                    replaceExtension(inputFile.name, type),
                    { type, lastModified: Date.now() },
                  );

            const compressedSizeKB = resultFile.size / 1024;
            const savedPercent =
              resultFile.size >= inputFile.size
                ? 0
                : Math.round(
                    ((inputFile.size - resultFile.size) / inputFile.size) * 100,
                  );

            resolve({ file: resultFile, originalSizeKB, compressedSizeKB, savedPercent });
          },
          type,
          quality,
        );
      };

      attemptBlob(tryTypes);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image for compression"));
    };

    img.src = objectUrl;
  });
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function replaceExtension(filename: string, mimeType: string): string {
  const extMap: Record<string, string> = {
    "image/webp": "webp",
    "image/jpeg": "jpg",
    "image/png": "png",
  };
  const ext = extMap[mimeType] ?? "webp";
  const base = filename.replace(/\.[^.]+$/, "");
  return `${base}.${ext}`;
}
