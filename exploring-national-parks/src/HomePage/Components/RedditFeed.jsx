import { useEffect, useState } from 'react';

/**
 * Renders a Reddit feed component that fetches the latest post from r/temple.
 * @module RedditFeed
 * @memberof HomePage
 * @returns {JSX.Element} The RedditFeed component.
 */
const RedditFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRedditPosts = async () => {
      try {
        setLoading(true);
        // Fetch from r/temple subreddit
        const response = await fetch('https://www.reddit.com/r/temple/hot.json?limit=3');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const posts = data.data.children.map(child => ({
          id: child.data.id,
          title: child.data.title,
          author: child.data.author,
          score: child.data.score,
          num_comments: child.data.num_comments,
          created_utc: child.data.created_utc,
          url: child.data.url,
          permalink: child.data.permalink,
          selftext: child.data.selftext,
          thumbnail: child.data.thumbnail
        }));
        
        setPosts(posts);
        setError(null);
      } catch (err) {
        console.error('Error fetching Reddit posts:', err);
        setError('Failed to load Reddit posts');
      } finally {
        setLoading(false);
      }
    };

    fetchRedditPosts();
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="reddit-feed-container">
      <h2 className="reddit-header">Latest from r/Temple</h2>
      <div className="reddit-embed">
        {loading && <p>Loading Reddit posts...</p>}
        {error && <p className="error">{error}</p>}
        {posts.map((post) => (
          <div key={post.id} className="reddit-post">
            <div className="post-header">
              <span className="post-score">▲ {post.score}</span>
              <span className="post-time">{formatTime(post.created_utc)}</span>
            </div>
            <h3 className="post-title">
              <a 
                href={`https://reddit.com${post.permalink}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {post.title}
              </a>
            </h3>
            <div className="post-meta">
              <span className="post-author">u/{post.author}</span>
              <span className="post-comments">{post.num_comments} comments</span>
            </div>
            {post.selftext && (
              <p className="post-text">{post.selftext.substring(0, 200)}...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedditFeed;
