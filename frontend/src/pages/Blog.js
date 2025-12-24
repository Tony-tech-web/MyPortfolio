import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/blog');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>

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
              <button className="text-blue-400 hover:text-blue-300">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;