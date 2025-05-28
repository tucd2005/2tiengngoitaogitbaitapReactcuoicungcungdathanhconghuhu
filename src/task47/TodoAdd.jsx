// Ví dụ: file AddTodo.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Dùng để chuyển hướng sau khi thêm

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low'); // Mặc định là 'low'
  const [completed, setCompleted] = useState(false); // Mặc định là false
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi submit form mặc định

    // --- ĐÂY LÀ ĐIỂM CHÍNH: GÁN createdAt TRƯỚC KHI GỬI ĐI ---
    const newTodo = {
      title,
      description,
      priority,
      completed,
      createdAt: new Date().toISOString() // Gán timestamp hiện tại theo định dạng ISO
    };

    try {
      const res = await axios.post('http://localhost:3000/todo', newTodo);
      console.log('Todo đã được thêm:', res.data);
      toast.success("Thêm Todo thành công!");
      navigate('/'); // Chuyển hướng về trang danh sách Todo
    } catch (error) {
      console.error('Lỗi khi thêm Todo:', error);
      toast.error("Thêm Todo thất bại!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Thêm Todo Mới</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {/* Có thể thêm checkbox cho completed nếu muốn */}
        {/* <div>
          <label>Completed:</label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div> */}
        <button type="submit">Thêm Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;