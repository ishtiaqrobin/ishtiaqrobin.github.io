import type { ITocItem } from "@/types/blog.type";

/**
 * Extract a table of contents from sanitized blog HTML.
 *
 * - Collects `<h2>` and `<h3>` headings
 * - Injects a stable `id` into each heading so anchors work
 * - Returns the (possibly modified) HTML plus the TOC list
 *
 * Runs on the server (no DOM), so it uses regex rather than DOMParser.
 */
export function buildToc(html: string): { html: string; toc: ITocItem[] } {
  const toc: ITocItem[] = [];
  const used = new Set<string>();

  const slugify = (text: string): string =>
    text
      .toLowerCase()
      .trim()
      .replace(/<[^>]+>/g, "")
      .replace(/&[a-z]+;/gi, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section";

  const uniqueId = (base: string): string => {
    let id = base;
    let n = 1;
    while (used.has(id)) {
      n += 1;
      id = `${base}-${n}`;
    }
    used.add(id);
    return id;
  };

  const withIds = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level: string, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return match;

      // Reuse an existing id if the author already set one
      const existing = /id=["']([^"']+)["']/i.exec(attrs);
      const id = existing ? existing[1] : uniqueId(slugify(text));

      toc.push({ id, text, level: Number(level) });

      if (existing) return match;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    },
  );

  return { html: withIds, toc };
}
