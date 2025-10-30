"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/shadcn-io/3d-card";
import { GitHubProfile } from "@/lib/githubService";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function AnimatedProfileCard() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/github");
        if (!response.ok) {
          throw new Error("Failed to fetch profile from API route.");
        }
        const data: GitHubProfile = await response.json();
        setProfile(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }); // Empty dependency array ensures this runs only once on mount

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !profile) {
    return (
      <div className="border-destructive bg-destructive/10 text-destructive rounded-md border p-6 text-center">
        <p className="font-semibold">Could not load GitHub data</p>
        <p className="text-sm">{error || "An unexpected error occurred."}</p>
      </div>
    );
  }

  return (
    <CardContainer containerClassName="py-0">
      <CardBody className="group-hover/card relative h-auto w-auto rounded-xl border border-black/10 bg-gray-50 p-6 sm:w-120 dark:border-white/20 dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {profile.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
        >
          {profile.bio}
        </CardItem>
        <CardItem translateZ="100" className="mt-4 w-full">
          <Image
            src={profile.avatar_url}
            height="1000"
            width="1000"
            className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
            alt={`Profile picture of ${profile.name}`}
          />
        </CardItem>
        <div className="mt-10 flex items-center justify-between">
          <CardItem
            translateZ={20}
            as={Link}
            href="https://www.linkedin.com/in/abrxao"
            target="_blank"
            className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
          >
            View LinkedIn →
          </CardItem>
          <CardItem
            translateZ={20}
            as={Button}
            className="rounded-xl px-4 py-2 text-xs font-bold"
          >
            <Link href={profile.html_url} target="_blank">
              Visit GitHub
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

// A simple loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="bg-background flex h-[450px] w-full max-w-sm flex-col space-y-4 rounded-xl border p-6 sm:max-w-md">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-60 w-full rounded-xl" />
      <div className="flex justify-between pt-4">
        <Skeleton className="h-10 w-30" />
        <Skeleton className="h-10 w-30" />
      </div>
    </div>
  );
}
