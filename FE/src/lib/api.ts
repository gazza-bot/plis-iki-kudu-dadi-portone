const configuredBaseUrl = (import.meta.env.VITE_BASE_URL ?? "").replace(/\/+$/, "");

export function getApiUrl(path: string) {
  if (
    import.meta.env.PROD &&
    configuredBaseUrl &&
    !configuredBaseUrl.startsWith("https://")
  ) {
    throw new Error("Production API configuration must use HTTPS.");
  }

  return `${configuredBaseUrl}${path}`;
}
