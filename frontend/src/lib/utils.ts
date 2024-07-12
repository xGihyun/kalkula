import { backend } from "@/wailsjs/go/models";
import { useSearchParams } from "@solidjs/router";
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isCurrentWorkspace(workspace: backend.Workspace): boolean {
  const [searchParams] = useSearchParams();

  return workspace.id === searchParams.workspace;
}
