import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FileText, GitGraphIcon } from "lucide-react";
import { BackgroundPattern } from "@/components/background-pattern";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
    >
      <BackgroundPattern />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Badge
          variant="secondary"
          className="border-border rounded-full py-1"
          asChild
        >
          <Link href="https://www.linkedin.com/in/abrxao" target="_blank">
            Available for new opportunities{" "}
            <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>
        <h1 className="mt-6 text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl">
          Abraão Albuquerque
        </h1>
        <p className="text-foreground/80 mt-6 md:text-lg">
          Dual Degree Engineering student specializing in Cybersecurity &
          E-payment, passionate about building secure and efficient full-stack
          applications.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="rounded-full text-base">
            <Link href="https://github.com/abrxao" target="_blank">
              View My Projects <GitGraphIcon />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-sm"
          >
            <Link href="/CV-Abraao-Albuquerque.pdf" target="_blank" download>
              <FileText className="mr-2 size-5" />
              Download CV
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
