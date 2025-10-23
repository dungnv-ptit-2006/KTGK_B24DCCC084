
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';
import PostCard from './PostCard';
import '../styles/PostList.css';

interface PostListProps {
  posts: Post[];
  onDeletePost: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDeletePost }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReadMore = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <h1>Danh sách bài viết</h1>
        <button 
          className="btn-create-post"
          onClick={() => navigate('/create')}
        >
          Viết bài mới
        </button>
      </div>

      <div className="post-list-stats">
        <p>Tổng số bài viết: {posts.length}</p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="posts-grid">
        {filteredPosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={onDeletePost}
            onReadMore={handleReadMore}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="no-posts">
          <p>Không có bài viết nào được tìm thấy.</p>
        </div>
      )}
    </div>
  );
};

export default PostList;