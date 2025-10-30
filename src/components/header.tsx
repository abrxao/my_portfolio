"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toogle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#publications", label: "Publications" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-background/80 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="#home" className="text-xl font-bold tracking-tight">
          Abraão A.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => {
            const isDisabled = link.label !== "Home";
            return (
              <Link
                key={link.href}
                href={isDisabled ? "#" : link.href}
                onClick={(e) => isDisabled && e.preventDefault()}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isDisabled
                    ? "text-muted-foreground/50 cursor-not-allowed"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title={isDisabled ? "Under construction" : ""}
                aria-disabled={isDisabled}
                tabIndex={isDisabled ? -1 : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          {/* Botão de Contato/LinkedIn Ativado */}
          <Button asChild>
            <Link href="https://www.linkedin.com/in/abrxao" target="_blank">
              View LinkedIn
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button onClick={toggleMenu} variant="ghost" size="icon">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="bg-background absolute top-16 left-0 w-full shadow-lg md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => {
              const isDisabled = link.label !== "Home";
              return (
                <Link
                  key={link.href}
                  href={isDisabled ? "#" : link.href}
                  onClick={(e) => {
                    if (isDisabled) {
                      e.preventDefault();
                    } else {
                      setIsMenuOpen(false);
                    }
                  }}
                  className={cn(
                    "text-lg font-medium",
                    isDisabled && "text-muted-foreground/50 cursor-not-allowed"
                  )}
                  title={isDisabled ? "Under construction" : ""}
                  aria-disabled={isDisabled}
                  tabIndex={isDisabled ? -1 : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Botão de Contato/LinkedIn Ativado no Menu Mobile */}
            <Button asChild className="mt-4">
              <Link
                href="https://www.linkedin.com/in/abrxao"
                target="_blank"
                onClick={() => setIsMenuOpen(false)}
              >
                View LinkedIn
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
