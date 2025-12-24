import React, { useEffect, useState } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogId = '6323760128659666218';
        const apiKey = process.env.REACT_APP_BLOGGER_API_KEY;
        if (!apiKey) {
          console.warn('Blogger API key not found. Please add REACT_APP_BLOGGER_API_KEY to your .env file.');
          setLoading(false);
          return;
        }
        const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`);
        const data = await response.json();
        const bloggerPosts = data.items || [];
        const formattedPosts = bloggerPosts.map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 300) + '...' : '',
          tags: post.labels || [],
          created_at: post.published,
          url: post.url
        }));
        setPosts(formattedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>

        {loading ? (
          <div className="text-center">Loading blog posts...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <div key={post.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-green-600 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-400 mb-4">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Read More →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;