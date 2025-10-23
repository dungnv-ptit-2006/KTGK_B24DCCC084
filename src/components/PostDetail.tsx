import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';
import '../styles/PostDetail.css';

interface PostDetailProps {
  posts: Post[];
  onDeletePost: (id: number) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ posts, onDeletePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = posts.find(p => p.id === parseInt(id || ''));

  if (!post) {
    return (
      <div className="post-detail-container">
        <h2>Bài viết không tồn tại</h2>
        <button onClick={() => navigate('/')} className="btn-back">
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      onDeletePost(post.id);
      navigate('/');
    }
  };

  return (
    <div className="post-detail-container">
      <button onClick={() => navigate('/')} className="btn-back">
        ← Quay lại
      </button>
      
      <article className="post-detail">
        <img src={post.thumbnail} alt={post.title} className="post-detail-thumbnail" />
        
        <div className="post-detail-content">
          <h1 className="post-detail-title">{post.title}</h1>
          
          <div className="post-detail-meta">
            <span className="post-detail-author">Tác giả: {post.author}</span>
            <span className="post-detail-date">Ngày đăng: {post.createdAt}</span>
            <span className="post-detail-category">Thể loại: {post.category}</span>
          </div>

          <div className="post-detail-text">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="post-detail-actions">
            <button 
              onClick={() => navigate(`/posts/edit/${post.id}`)}
              className="btn-edit"
            >
              Chỉnh sửa
            </button>
            <button 
              onClick={handleDelete}
              className="btn-delete"
            >
              Xóa bài viết
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;