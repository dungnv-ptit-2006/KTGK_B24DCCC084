import React from 'react';
import { Post } from '../types/Post';
import '../styles/PostCard.css';

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
  onReadMore: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete, onReadMore }) => {
  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="post-card">
      <img src={post.thumbnail} alt={post.title} className="post-thumbnail" />
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <div className="post-meta">
          <span className="post-author">Tác giả: {post.author}</span>
          <span className="post-date">{post.createdAt}</span>
        </div>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-actions">
          <button 
            className="btn-read-more" 
            onClick={() => onReadMore(post.id)}
          >
            Đọc thêm
          </button>
          <button 
            className="btn-delete" 
            onClick={handleDelete}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;