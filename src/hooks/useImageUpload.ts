"use client";

/**
 * useImageUpload.ts
 *
 * Reusable React hook for image selection, compression, and preview.
 *
 * Usage:
 *   const { file, preview, isCompressing, handleFileChange, reset } = useImageUpload();
 *
 * Then:
 *   <input type="file" accept="image/*" onChange={handleFileChange} />
 *   {preview && <img src={preview} />}
 *   // use `file` (compressed) when building FormData
 */

import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { compressImage, CompressOptions } from "@/lib/imageCompressor";

export interface UseImageUploadOptions extends CompressOptions {
  /** Max file size in MB before compression. Default: 5 */
  maxSizeMB?: number;
  /** Called after successful compression with result info */
  onCompressed?: (info: { originalKB: number; compressedKB: number; savedPercent: number }) => void;
}

export interface UseImageUploadReturn {
  /** The compressed File, ready for FormData */
  file: File | null;
  /** Object URL for preview (use as <img src={preview}>) */
  preview: string | null;
  /** True while compression is running */
  isCompressing: boolean;
  /** Pass directly to <input type="file" onChange={handleFileChange}> */
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  /** Reset all state (call on dialog close) */
  reset: () => void;
  /** Ref to attach to the <input> if you need imperative access */
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const DEFAULT_MAX_SIZE_MB = 5;

export function useImageUpload(options: UseImageUploadOptions = {}): UseImageUploadReturn {
  const { maxSizeMB = DEFAULT_MAX_SIZE_MB, onCompressed, ...compressOptions } = options;

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setFile(null);
    setIsCompressing(false);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (!selected) return;

      // Absolute limit to prevent browser crash (e.g. 50MB)
      const ABSOLUTE_LIMIT_MB = 50;
      if (selected.size > ABSOLUTE_LIMIT_MB * 1024 * 1024) {
        toast.error(`File is too large! Maximum limit for processing is ${ABSOLUTE_LIMIT_MB}MB.`);
        e.target.value = "";
        return;
      }

      setIsCompressing(true);

      try {
        const result = await compressImage(selected, {
          quality: 0.85,
          outputType: "image/webp",
          ...compressOptions,
        });

        // Check size after compression
        if (result.file.size > maxSizeMB * 1024 * 1024) {
          toast.error(
            `File too large! Even after compression, it is ${(
              result.file.size /
              (1024 * 1024)
            ).toFixed(2)}MB. Maximum allowed size is ${maxSizeMB}MB.`,
          );
          reset(); // Clear preview, file, and input field
          return;
        }

        // Show success message if compression actually saved space
        if (result.savedPercent > 0) {
          toast.success("Image compressed successfully!");
        }

        // Revoke old preview URL to avoid memory leaks
        setPreview((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(result.file);
        });

        setFile(result.file);

        if (result.savedPercent > 0) {
          onCompressed?.({
            originalKB: result.originalSizeKB,
            compressedKB: result.compressedSizeKB,
            savedPercent: result.savedPercent,
          });
        }
      } catch (error) {
        console.error("Image processing error:", error);
        toast.error("Failed to process image. Please try another file.");
        reset();
      } finally {
        setIsCompressing(false);
      }
    },
    [maxSizeMB, compressOptions, onCompressed, reset],
  );

  return { file, preview, isCompressing, handleFileChange, reset, inputRef };
}
