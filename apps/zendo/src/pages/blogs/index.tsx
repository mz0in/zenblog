import Spinner from "@/components/Spinner";
import AppLayout from "@/layouts/AppLayout";
import { createAPIClient } from "@/lib/app/api";
import { useBlogsQuery } from "@/queries/blogs";
import Link from "next/link";
import { IoSettingsSharp, IoAdd } from "react-icons/io5";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { PiPencilLine } from "react-icons/pi";
import { useEffect } from "react";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const api = createAPIClient();
  const { data, error, isLoading } = useBlogsQuery();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (data?.length === 0) {
      router.push("/blogs/create");
    }
  }, [router, data, isLoading]);

  return (
    <AppLayout>
      <div className="mt-8 min-h-screen">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between p-3">
            <h1 className="text-xl font-semibold">My blogs</h1>
            <div>
              <Button asChild>
                <Link className="btn" href="/blogs/create">
                  <Plus />
                  Create blog
                </Link>
              </Button>
            </div>
          </div>
          {isLoading && (
            <div className="flex-center py-12">
              <Spinner />
            </div>
          )}
          {data?.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center">
              <PiPencilLine size="48" className="text-orange-500" />
              <h2 className="mt-4 text-2xl">Start by creating a blog</h2>
              <Button asChild className="mt-6">
                <Link href="/blogs/create">Create blog</Link>
              </Button>
            </div>
          )}
          <ul className="mx-2 grid grid-cols-1 gap-2 md:grid-cols-2">
            {data?.map((blog) => {
              return (
                <li
                  className="group rounded-xl border bg-gradient-to-b from-white to-zinc-50 shadow-sm transition-all hover:border-orange-400"
                  key={blog.id}
                >
                  <Link
                    className="block w-full min-w-[320px] gap-3 rounded-xl p-3  "
                    href={`/blogs/${blog.id}/posts`}
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-3xl transition-all group-hover:scale-105">
                          {blog.emoji}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{blog.title}</h3>
                        <p className="text-gray-600">{blog.description}</p>
                      </div>
                    </div>
                    <div className="actions mt-4">
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/blogs/${blog.id}/settings`);
                        }}
                        title="Settings"
                        aria-label="Settings"
                      >
                        <IoSettingsSharp size="24" />
                      </Button>
                      <Button
                        variant={"secondary"}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/blogs/${blog.id}/create`);
                        }}
                      >
                        <IoAdd size="24" />
                        New post
                      </Button>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
