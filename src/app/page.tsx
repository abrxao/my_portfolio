import Link from "next/link";
import { getUserProfile, GitHubProfile } from "@/lib/githubService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Helper component for displaying stats
function ProfileStat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

// The main page is an async Server Component
export default async function HomePage() {
  let userProfile: GitHubProfile | null = null;
  let fetchError: string | null = null;

  try {
    // Fetch the GitHub profile data on the server
    userProfile = await getUserProfile();
  } catch (error) {
    fetchError =
      error instanceof Error ? error.message : "An unknown error occurred.";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Portfolio Under Construction
          </CardTitle>
          <CardDescription>
            My new portfolio is being crafted. In the meantime, you can find me
            on social media.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          {fetchError && (
            <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-center text-destructive">
              <p className="font-semibold">Could not load GitHub data</p>
              <p className="text-sm">{fetchError}</p>
            </div>
          )}

          {userProfile && (
            <>
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage
                  src={userProfile.avatar_url}
                  alt={userProfile.name || userProfile.login}
                />
                <AvatarFallback>
                  {userProfile.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
                <p className="text-muted-foreground">@{userProfile.login}</p>
                <p className="mt-2 max-w-xs text-sm">{userProfile.bio}</p>
              </div>
              <div className="flex w-full justify-around pt-4">
                <ProfileStat label="Followers" value={userProfile.followers} />
                <ProfileStat
                  label="Repositories"
                  value={userProfile.public_repos}
                />
                <ProfileStat label="Following" value={userProfile.following} />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-center gap-4">
            <Button asChild className="grow" variant="secondary">
              <Link href="https://www.linkedin.com/in/abrxao" target="_blank">
                View LinkedIn
              </Link>
            </Button>
            <Button asChild className="grow">
              <Link
                href={userProfile?.html_url || "https://github.com/abrxao"}
                target="_blank"
              >
                Visit GitHub
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
