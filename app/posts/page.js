export default function PostsPage() {
  // Temporary fake data (we'll replace with Supabase later)
  const posts = [
    { id: 1, title: "Supreme Court Ruling on Constitutional Matter", date: "2024-11-01" },
    { id: 2, title: "Court of Appeal Decision on Land Dispute", date: "2024-10-28" },
    { id: 3, title: "High Court Judgment on Commercial Law", date: "2024-10-25" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Legal Reports
        </h1>
        
        <div className="space-y-4">
          {posts.map(post => (
            <div 
              key={post.id} 
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{post.date}</p>
              <a 
                href={`/posts/${post.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read Full Report →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}