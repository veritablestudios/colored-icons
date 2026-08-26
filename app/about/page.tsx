import type { Metadata } from "next";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@/components/ui/kibo-ui/snippet";
import { SITE } from "@/constants/site";
import {
  CI_CSS_URL_LATEST,
  CI_CSS_URL_VERSION,
  features,
  socialIcons,
  techIcons,
} from "@/constants/about";
import type { Icon as BaseIcon } from "@/interfaces";

export const metadata: Metadata = {
  title: `About · ${SITE.name}`,
  description:
    "Learn about Coloured Icons, a CDN-first icon library with simple <i> based usage and Font Awesome-like sizing.",
  alternates: { canonical: "/about" },
};

function CdnInclude({ text, url }: { text: string; url: string }) {
  const link = `<link rel="stylesheet" href="${url}" />`;

  return (
    <>
      <p className="text-gray-600 my-4">{text}</p>
      <Snippet value="cdn">
        <SnippetHeader>
          <SnippetTabsList>
            <SnippetTabsTrigger value="cdn">
              <LinkIcon size={14} />
              <span>CDN Link</span>
            </SnippetTabsTrigger>
          </SnippetTabsList>
          <SnippetCopyButton value={link} className="cursor-pointer" />
        </SnippetHeader>
        <SnippetTabsContent value="cdn">{link}</SnippetTabsContent>
      </Snippet>
    </>
  );
}

function IconCard({ icon }: { icon: Pick<BaseIcon, "name" | "classes"> }) {
  return (
    <Card className="flex flex-col items-center justify-center p-0 rounded-xl bg-white border border-gray-200 hover:border-purple-200 hover:shadow-md transition-all duration-200">
      <CardContent className="flex flex-col items-center gap-3 p-6">
        <i className={`ci ci-${icon.classes[0]} ci-3x text-gray-800`} />
        <span className="text-sm font-medium text-gray-600">{icon.name}</span>
      </CardContent>
    </Card>
  );
}

function IconSection({
  title,
  icons,
}: {
  title: string;
  icons: Array<Pick<BaseIcon, "name" | "classes">>;
}) {
  return (
    <section>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {icons.map((icon) => (
          <IconCard key={icon.name} icon={icon} />
        ))}
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-14 lg:py-20">
      {/* Hero */}
      <div className="text-center space-y-8">
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          About Coloured Icons
        </h1>
        <p className="text-lg leading-8 text-gray-600 sm:text-xl/8">
          A carefully curated collection of beautiful, customizable icons for your next project
        </p>
      </div>

      <div className="mt-16 space-y-12">
        {/* The Project */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">The Project</h2>
          <p className="text-gray-600">
            Coloured Icons is an open-source project designed to provide developers and designers
            with high-quality, customizable icons. Each icon is carefully crafted to maintain
            consistency while offering flexibility in color and style.
          </p>
        </section>

        {/* Explore Icons */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900">Explore Our Icon Collection</h2>
          <div className="space-y-6">
            <IconSection title="Tech Icons" icons={techIcons} />
            <IconSection title="Social Icons" icons={socialIcons} />
          </div>
        </section>

        {/* Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Features</h2>
          <ul className="space-y-4 text-gray-600">
            {features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className="text-purple-600">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Quick Start */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Quick Start</h2>
          <CdnInclude text="Include via CDN (another version):" url={CI_CSS_URL_VERSION} />
          <CdnInclude text="Include via CDN (latest):" url={CI_CSS_URL_LATEST} />
        </section>

        {/* Community */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Join the Community</h2>
          <p className="text-gray-600">
            Coloured Icons is built with and for the developer community. We welcome contributions,
            suggestions, and feedback to make this project even better.
          </p>
          <Button asChild>
            <Link
              href="https://github.com/dheereshag/coloured-icons"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <SiGithub className="h-4 w-4" />
              View on GitHub
            </Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
