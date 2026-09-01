import { apiFetch } from "@/services/api-client";
import type { GitHubProfile } from "@/types/github";

export const githubKeys = {
  profile: ["github", "profile"] as const,
};

export function fetchGitHubProfile() {
  return apiFetch<GitHubProfile>("/api/github");
}
