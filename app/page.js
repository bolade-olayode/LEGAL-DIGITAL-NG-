import Link from "next/link";

export default function Page() {
  return (
    <section className="min-h-[60vh] grid place-items-center text-center">
      <div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Legal Digital NG</h1>
        <p className="mt-3 text-gray-600">Nigerian Legal Reporting Platform</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/posts" className="px-4 py-2 rounded-md bg-blue-600 text-white">View Posts</Link>
          <Link href="/about" className="px-4 py-2 rounded-md bg-gray-200">About Us</Link>
        </div>
      </div>
    </section>
  );
}
