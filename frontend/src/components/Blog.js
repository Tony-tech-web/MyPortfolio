import React, { useEffect, useRef, useState } from 'react';

const Blog = () => {
  const sectionRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
        const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=3`);
        const data = await response.json();
        const bloggerPosts = data.items || [];
        const formattedPosts = bloggerPosts.map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '',
          tags: post.labels || [],
          created_at: post.published,
          url: post.url
        }));
        console.log('Blog posts loaded:', formattedPosts);
        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Set fallback posts on error
        const fallbackPosts = [
          { id: 1, title: 'Blog Post 1', excerpt: 'Unable to load from Blogger', tags: ['error'], created_at: new Date(), url: '#' },
          { id: 2, title: 'Blog Post 2', excerpt: 'Check your API key', tags: ['setup'], created_at: new Date(), url: '#' },
          { id: 3, title: 'Blog Post 3', excerpt: 'Visit Blogger directly', tags: ['link'], created_at: new Date(), url: '#' }
        ];
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 reveal">
            Latest <span className="gradient-text">Blog Posts</span>
          </h2>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              <p className="mt-4 text-gray-400">Loading blog posts...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="glass-card p-6 hover:scale-105 transition-transform duration-300 reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Read More →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="text-center mt-12 reveal">
            <p className="text-gray-400">
              Want to read more? Check out my full blog at{' '}
              <a
                href="https://www.blogger.com/blog/posts/6323760128659666218?bpli=1&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Blogger
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;