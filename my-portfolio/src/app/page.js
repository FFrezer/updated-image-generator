export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-white p-6">
      <h1 className="text-5xl font-bold text-indigo-600 mb-4">
        👋 Hi, I'm FREZER
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        I'm a web developer building beautiful experiences with Next.js & Tailwind CSS.
      </p>
      <a
        href="#"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        View My Work
      </a>
    </main>
  );
}