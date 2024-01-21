/* eslint-disable react-hooks/rules-of-hooks */
import { docs } from "@/cms";
import ZendoLogo from "@/components/ZendoLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter } from "lucide-react";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

type Props = {};

const layout = async ({
  children,
  params,
}: PropsWithChildren<{
  params: {
    slug: string;
  };
}>) => {
  const posts = await docs.posts.getAll();

  return (
    <div className="mx-auto flex max-h-screen max-w-6xl">
      <aside className="min-h-screen min-w-[16rem] overflow-auto border-x">
        <div className="p-3 text-center">
          <Link href="/">
            <ZendoLogo />
          </Link>
        </div>
        <ul className="p-4 font-medium">
          {posts.map((post) => (
            <Link
              data-state={params.slug === post.slug ? "active" : "inactive"}
              className={
                "group flex items-center gap-1 rounded-md p-1.5 text-slate-600 transition-all hover:text-orange-600 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600"
              }
              key={post.slug}
              href={"/docs/" + post.slug}
            >
              <ArrowRight
                className="mr-1 inline-block text-inherit opacity-60"
                size={16}
              />
              {post.title}
            </Link>
          ))}
        </ul>
      </aside>
      <main className="w-full flex-grow overflow-auto">{children}</main>
      <aside className="min-w-[16rem] border-x">
        <div className="flex h-12 items-center justify-end gap-0.5 border-b px-2">
          <Button variant={"ghost"} size="icon">
            <Link href="https://github.com/jordienr/zenblog">
              <Github size={16} />
            </Link>
          </Button>
          <Button variant={"ghost"} size="icon">
            <Link href="https://x.com/zenbloghq">
              <Twitter size={16} />
            </Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href="/blogs">Dashboard</Link>
          </Button>
        </div>
        <div className="p-2">
          <h2 className="text-sm font-medium text-slate-500">On this page</h2>
          <ul className="mt-2">
            <li># title 1</li>
            <li># title 2</li>
            <li># title 3</li>
            <li># title 4</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default layout;
