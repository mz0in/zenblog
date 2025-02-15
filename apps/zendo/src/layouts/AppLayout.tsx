import UserButton from "@/components/UserButton";
import ZendoLogo from "@/components/ZendoLogo";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Notifications from "@/components/Notifications";
import Feedback from "@/components/Feedback";

type Props = {
  children?: React.ReactNode;
  loading?: boolean;
};
export default function AppLayout({ children, loading }: Props) {
  return (
    <div
      className={`flex min-h-screen flex-col border-b bg-zinc-50 font-sans ${
        loading ? "overflow-hidden" : ""
      }`}
    >
      {loading && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <div className="animate-spin text-5xl">🍊</div>
        </div>
      )}

      <nav className="sticky top-0 z-20 mx-auto w-full max-w-5xl border-b bg-zinc-50">
        <div className="mx-auto flex h-full items-center justify-between p-4">
          <div className="z-20  flex h-full items-center gap-2">
            <Link href="/" className="rounded-md px-1 text-lg font-medium">
              <ZendoLogo />
            </Link>
            <Link
              href="/blogs"
              className="rounded-full px-3 py-1 text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600"
            >
              Blogs
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Feedback />
            <Link
              className="rounded-full px-3 py-1 text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              href="/docs/getting-started"
            >
              Docs
            </Link>
            <Notifications />
            <span className="ml-2">
              <UserButton />
            </span>
          </div>
        </div>
      </nav>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-slate-50 pb-24 shadow-md"
      >
        {children}
      </motion.div>
      <footer className="flex justify-between border-t bg-slate-100 p-8 font-mono text-slate-700">
        <ul>
          <li>thanks for checking out zenblog</li>
        </ul>
        <ul className="flex gap-4">
          <li>
            <Link href="https://github.com/jordienr/zenblog">
              <Github size="24" />
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/zenbloghq">
              <Twitter size="24" />
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
