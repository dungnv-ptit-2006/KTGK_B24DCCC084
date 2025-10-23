import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Post, PostFormData } from '../types/Post';
import '../styles/PostForm.css';

interface PostFormProps {
  posts: Post[];
  onAddPost: (post: Post) => void;
  onUpdatePost: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ posts, onAddPost, onUpdatePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const existingPost = id ? posts.find(post => post.id === parseInt(id)) : null;

  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    author: '',
    content: '',
    thumbnail: '',
    category: 'Công nghệ'
  });

  const [errors, setErrors] = useState<Partial<PostFormData>>({});

  useEffect(() => {
    if (isEdit && existingPost) {
      setFormData({
        title: existingPost.title,
        author: existingPost.author,
        content: existingPost.content,
        thumbnail: existingPost.thumbnail,
        category: existingPost.category
      });
    }
  }, [isEdit, existingPost]);

  const validateForm = (): boolean => {
    const newErrors: Partial<PostFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Tác giả là bắt buộc';
    } else if (formData.author.length < 3) {
      newErrors.author = 'Tác giả phải có ít nhất 3 ký tự';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
    } else if (formData.content.length < 50) {
      newErrors.content = 'Nội dung phải có ít nhất 50 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (isEdit && existingPost) {
      const updatedPost: Post = {
        ...existingPost,
        ...formData,
        excerpt: formData.content.substring(0, 100) + '...'
      };
      onUpdatePost(updatedPost);
      alert('Cập nhật thành công!');
      navigate(`/posts/${existingPost.id}`);
    } else {
      const newPost: Post = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toLocaleDateString('vi-VN'),
        excerpt: formData.content.substring(0, 100) + '...'
      };
      onAddPost(newPost);
      alert('Đăng bài thành công!');
      navigate('/');
    }
  };

  const handleCancel = () => {
    if (isEdit && existingPost) {
      navigate(`/posts/${existingPost.id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="post-form-container">
      <h2>{isEdit ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Tiêu đề *</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Tác giả *</label>
          <input
            type="text"
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
            className={errors.author ? 'error' : ''}
          />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">URL ảnh thumbnail</label>
          <input
            type="text"
            id="thumbnail"
            value={formData.thumbnail}
            onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Thể loại</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="Công nghệ">Công nghệ</option>
            <option value="Du lịch">Du lịch</option>
            <option value="Ẩm thực">Ẩm thực</option>
            <option value="Đời sống">Đời sống</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Nội dung *</label>
          <textarea
            id="content"
            rows={10}
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className={errors.content ? 'error' : ''}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {isEdit ? 'Cập nhật' : 'Đăng bài'}
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;