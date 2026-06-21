export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(value: number): string {
  return value.toLocaleString("id-ID");
}

export const categoryLabels: Record<string, string> = {
  beasiswa: "Beasiswa",
  magang: "Magang",
  lomba: "Lomba",
};

export const categoryBadgeStyles: Record<string, string> = {
  beasiswa: "bg-primary/10 text-primary",
  magang: "bg-secondary-container/20 text-secondary",
  lomba: "bg-tertiary-fixed/40 text-tertiary-container",
};
