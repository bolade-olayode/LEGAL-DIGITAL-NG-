import "./globals.css";
import Link from "next/link";

export const metadata = { title: "Legal Digital NG", description: "Nigerian Legal Reporting Platform" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <nav className="mx-auto max-w-5xl px-4 h-14 flex items-center gap-6">
            <Link href="/" className="font-semibold">Legal Digital NG</Link>
            <div className="ml-auto flex items-center gap-4 text-sm">
              <Link href="/posts" className="hover:underline">Posts</Link>
              <Link href="/about" className="hover:underline">About</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-12">{children}</main>
      </body>
    </html>
  );
}
