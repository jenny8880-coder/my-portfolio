import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-10">
      <h1 className="text-4xl font-bold mb-6 text-black">Hello, I'm Jenny</h1>
      <p className="text-xl text-gray-600 mb-8">Welcome to my portfolio.</p>
      
      <div className="flex gap-4">
        <Link 
          href="/work/kemtai" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Kemtai Project
        </Link>
      </div>
    </main>
  );
}