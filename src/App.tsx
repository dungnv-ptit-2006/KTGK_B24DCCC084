import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import { Post } from './types/Post';
import './App.css';

const initialPosts: Post[] = [
  {
    id: 1,
    title: 'React.js - Thư viện JavaScript cho giao diện người dùng',
    author: 'Nguyễn Văn Minh',
    content: 'React là một thư viện JavaScript phổ biến được phát triển bởi Facebook để xây dựng giao diện người dùng. Nó cho phép developers tạo ra các component có thể tái sử dụng và quản lý state một cách hiệu quả.\n\nVới Virtual DOM, React tối ưu hóa hiệu suất ứng dụng bằng cách chỉ cập nhật những phần thay đổi trong giao diện. Điều này làm cho ứng dụng React chạy mượt mà ngay cả với dữ liệu lớn.',
    thumbnail: 'https://mona.media/wp-content/uploads/2021/06/reactjs.png',
    category: 'Công nghệ',
    createdAt: '15/10/2023',
    excerpt: 'React là một thư viện JavaScript phổ biến được phát triển bởi Facebook để xây dựng giao diện người dùng...'
  },
  {
    id: 2,
    title: 'Khám phá vịnh Hạ Long - Kỳ quan thiên nhiên thế giới',
    author: 'Trần Thị Thư',
    content: 'Vịnh Hạ Long là một trong những điểm đến du lịch nổi tiếng nhất Việt Nam, được UNESCO công nhận là di sản thiên nhiên thế giới. Với hàng nghìn hòn đảo đá vôi nhấp nhô trên mặt nước xanh ngọc, Hạ Long mang đến một khung cảnh thiên nhiên kỳ vĩ và hùng vĩ.\n\nDu khách có thể tham gia các tour du thuyền ngắm cảnh, khám phá hang động, hoặc tham gia các hoạt động như chèo kayak, bơi lội trong làn nước trong xanh.',
    thumbnail: 'https://statics.vinpearl.com/du-lich-vinh-Ha-Long-hinh-anh1_1625911963.jpg',
    category: 'Du lịch',
    createdAt: '12/10/2023',
    excerpt: 'Vịnh Hạ Long là một trong những điểm đến du lịch nổi tiếng nhất Việt Nam, được UNESCO công nhận là di sản...'
  },
  {
    id: 3,
    title: 'Phở - Món ăn tinh hoa của ẩm thực Việt Nam',
    author: 'Lê Văn Khải',
    content: 'Phở không chỉ là một món ăn mà còn là biểu tượng văn hóa ẩm thực Việt Nam. Một bát phở ngon cần có nước dùng trong veo, thơm mùi xương hầm, cùng với những sợi bánh phở mềm mại và thịt bò tái chín vừa phải.\n\nBí quyết để có nước dùng ngon nằm ở việc hầm xương kỹ lưỡng, kết hợp với các loại gia vị truyền thống như quế, hồi, thảo quả. Phở thường được ăn kèm với rau thơm, chanh, ớt và tương ớt tùy theo khẩu vị.',
    thumbnail: 'https://www.bonboncar.vn/blog/content/images/2025/08/pho-bo-ha-noi.jpeg',
    category: 'Ẩm thực',
    createdAt: '10/10/2023',
    excerpt: 'Phở không chỉ là một món ăn mà còn là biểu tượng văn hóa ẩm thực Việt Nam. Một bát phở ngon cần có nước...'
  },
  {
    id: 4,
    title: 'Cách quản lý thời gian hiệu quả trong công việc',
    author: 'Phạm Thị Thúy',
    content: 'Quản lý thời gian hiệu quả là kỹ năng quan trọng giúp chúng ta làm việc năng suất hơn và giảm căng thẳng. Một số phương pháp quản lý thời gian phổ biến bao gồm:\n\n1. Phương pháp Pomodoro: Làm việc 25 phút, nghỉ 5 phút\n2. Ma trận Eisenhower: Phân loại công việc theo mức độ quan trọng và khẩn cấp\n3. Lập kế hoạch tuần: Xác định mục tiêu và nhiệm vụ cho cả tuần\n\nViệc áp dụng các phương pháp này giúp chúng ta tập trung tốt hơn và hoàn thành công việc đúng hạn.',
    thumbnail: 'https://eiv.edu.vn/wp-content/uploads/2023/09/Ky-nang-quan-ly-thoi-gian-1.png',
    category: 'Đời sống',
    createdAt: '08/10/2023',
    excerpt: 'Quản lý thời gian hiệu quả là kỹ năng quan trọng giúp chúng ta làm việc năng suất hơn và giảm căng thẳng...'
  },
  {
    id: 5,
    title: 'Những xu hướng công nghệ sẽ thống trị năm 2026',
    author: 'Hoàng Văn E',
    content: 'Năm 2026 hứa hẹn mang đến nhiều đột phá công nghệ mới. Dưới đây là những xu hướng đáng chú ý:\n\n- AI và Machine Learning tiếp tục phát triển mạnh mẽ\n- Metaverse và Web3 trở nên phổ biến hơn\n- Công nghệ xe điện và tự lái\n- IoT kết hợp với 5G\n- Bảo mật và an ninh mạng\n\nCác doanh nghiệp cần chuẩn bị sẵn sàng để thích ứng với những thay đổi này, đầu tư vào đào tạo nhân lực và nâng cấp hệ thống công nghệ.',
    thumbnail: 'https://giaiphapvanphong.vn/Image/Picture/New/xu-huong-cong-nghe.jpg',
    category: 'Công nghệ',
    createdAt: '05/10/2023',
    excerpt: 'Năm 2026 hứa hẹn mang đến nhiều đột phá công nghệ mới. Dưới đây là những xu hướng đáng chú ý: AI và Machine...'
  }
];

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleAddPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <PostList 
                  posts={posts} 
                  onDeletePost={handleDeletePost} 
                />
              } 
            />
            <Route 
              path="/posts" 
              element={
                <PostList 
                  posts={posts} 
                  onDeletePost={handleDeletePost} 
                />
              } 
            />
            <Route 
              path="/create" 
              element={
                <PostForm 
                  posts={posts}
                  onAddPost={handleAddPost}
                  onUpdatePost={handleUpdatePost}
                />
              } 
            />
            <Route 
              path="/posts/:id" 
              element={
                <PostDetail 
                  posts={posts}
                  onDeletePost={handleDeletePost}
                />
              } 
            />
            <Route 
              path="/posts/edit/:id" 
              element={
                <PostForm 
                  posts={posts}
                  onAddPost={handleAddPost}
                  onUpdatePost={handleUpdatePost}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;