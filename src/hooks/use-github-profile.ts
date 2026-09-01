import { useQuery } from "@tanstack/react-query";
import { fetchGitHubProfile, githubKeys } from "@/services/github";

export function useGitHubProfile() {
  return useQuery({
    queryKey: githubKeys.profile,
    queryFn: fetchGitHubProfile,
    staleTime: 5 * 60 * 1000,
  });
}
