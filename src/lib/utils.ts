import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(userId: string) {
    const now = new Date();

    const pad = (n: number) => n.toString().padStart(2, "0");

    const formatted =
        now.getFullYear() +
        pad(now.getMonth() + 1) +
        pad(now.getDate()) +
        pad(now.getHours()) +
        pad(now.getMinutes()) +
        pad(now.getSeconds()) +
        now.getMilliseconds().toString().padStart(3, "0");

    return `${userId}-${formatted}`;
}
