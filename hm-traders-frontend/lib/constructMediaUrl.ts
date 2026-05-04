/**
 * Constructs a proper media URL from Payload CMS responses
 * Works in both development (localhost) and production environments
 * Returns absolute URLs with the CMS base URL to ensure they work across different ports
 * 
 * Payload returns URLs like: /api/media/file/{filename}
 * We prepend the base CMS URL (without /api) so they always point to the CMS
 * 
 * Supports all media types: images (png, jpg, gif, webp, svg), PDFs, and other files
 * 
 * @param url - The URL from Payload CMS (can be relative or absolute)
 * @returns Formatted URL or null if input is null/undefined
 */

export function constructMediaUrl(url?: string | null): string | null {
  if (!url) return null
  // If it's already a full URL starting with http, return as is
  if (url.startsWith("http")) {
    return url;
  }

  // Get the base CMS URL (without /api suffix)
  const cmsBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  // For relative URLs from CMS, prepend the CMS base URL
  // This ensures media requests go to the CMS, not the frontend
  if (url.startsWith("/api/media")) {
    return `${cmsBase}${url}`; // e.g., http://localhost:3000/api/media/file/image.png
  }

  // For any other relative path starting with /, prepend CMS base URL
  if (url.startsWith("/")) {
    return `${cmsBase}${url}`;
  }

  // Prepend slash and CMS base URL for non-absolute paths
  return `${cmsBase}/${url}`;
}

/**
 * Check if a URL points to a PDF file
 * @param url - The URL to check
 * @returns true if URL ends with .pdf
 */
export function isPdfUrl(url?: string | null): boolean {
  if (!url) return false;
  return url.toLowerCase().endsWith(".pdf");
}

/**
 * Check if a URL points to an image file
 * @param url - The URL to check
 * @returns true if URL is an image (png, jpg, jpeg, gif, webp, svg)
 */
export function isImageUrl(url?: string | null): boolean {
  if (!url) return false;
  const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"];
  const lowerUrl = url.toLowerCase();
  return imageExtensions.some((ext) => lowerUrl.endsWith(ext));
}

/**
 * Get file extension from URL
 * @param url - The URL to extract extension from
 * @returns File extension (e.g., 'pdf', 'png') or empty string
 */
export function getFileExtension(url?: string | null): string {
  if (!url) return "";
  const match = url.match(/\.([^.?]+)(?:\?|$)/);
  return match ? match[1].toLowerCase() : "";
}

/**
 * Get MIME type from file URL
 * @param url - The URL to get MIME type for
 * @returns MIME type string
 */
export function getMimeType(url?: string | null): string {
  if (!url) return "application/octet-stream";

  const ext = getFileExtension(url);

  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    txt: "text/plain",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };

  return mimeTypes[ext] || "application/octet-stream";
}
