export function getFaviconUrl(websiteUrl: string): string | null {
  try {
    const url = new URL(websiteUrl);

    return `https://icons.duckduckgo.com/ip2/${url.hostname}.ico`;
  } catch (err) {
    console.error("Invalid URL", err);
    return null;
  }
}

export function getDomain(url: string): { fullUrl: string; domain: string } {
  try {
    const parsedUrl = new URL(url);
    const fullUrl = parsedUrl.origin;
    const domain = parsedUrl.hostname.replace(/^www\./, "");
    return { fullUrl, domain };
  } catch (err) {
    console.error("Invalid URL:", err);
    return { fullUrl: "", domain: "" };
  }
}
