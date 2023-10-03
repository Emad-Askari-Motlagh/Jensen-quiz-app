export function getToken(value: string | null): string | null {
  if (typeof document !== "undefined" && value && typeof value === "string") {
    const tokenRow = value.split("; ").find((row) => row.startsWith("token="));
    if (tokenRow) {
      const token = tokenRow.split("=")[1];
      return token;
    }
  }
  return null;
}
