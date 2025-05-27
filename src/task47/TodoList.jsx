import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Space, Table, Tag } from 'antd';

const TodoList = () => {
  const [todo, setTodo] = useState([]);

  // setTodo ở đây dùng để cập nhật lại danh sách todo sau khi xóa 

  useEffect(() => {
    const fetchTodo = async () => {
      // ôn lại kiến thức tí : async await để làm gì nhẻ ? 
      // async await là hàm bất đồng bộ dùng để xử lý bất đồng bộ nhưng theo cách giống như đồng bộ
      // nó giúp code : 
      //  @ dễ đọc hơn
      //  @ tránh bị callback hell
      //  @ dễ debug hơn 
      //  @ ok thằng em trai @ //
      try {
        const res = await axios.get(`http://localhost:3000/todo`);
        setTodo(res.data);
      } catch (error) {
        console.log("Có lỗi rồi em yêu ơi", error);
      }
    };
    fetchTodo();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("ban co muon xoa san pham khong");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      toast.success("Xoa san pham thanh cong");
      setTodo(currentTodo =>
        currentTodo.filter(item => item.id !== id)
      );
      // ở trong bài này filter dùng để lọc ra các phần tử khác phần tử id và tạo ra 1 mảng mới không có id đó  
      // filter là gì ? 
      // filter là 1 phương thức trong mảng của array. Dùng để lọc ra các phần tử thỏa mãn với điều kiện và trả về 1 mảng mới chứa những phần tử đó 

    } catch (error) {
      console.log("loi xoa san pham khong thanh cong", error);
      toast.error("xoa that bai");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Bài task 47 : wellcome building todo</h1>

      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/todo/add">thêm todo</Link>
      </Button>

      <Table
        dataSource={todo.map((item, index) => ({ ...item, key: item.id, stt: index + 1 }))}
        columns={[
          {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
          },
          {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'completed',
            dataIndex: 'completed',
            key: 'completed',
            render: (completed) =>
              completed ? <Tag color="green">da hoan thanh</Tag> : <Tag color="red">chua hoan thanh</Tag>,
          },
          {
            title: 'createdAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
          },
          {
            title: 'priority',
            dataIndex: 'priority',
            key: 'priority',
          },
          {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'active',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button danger onClick={() => handleDelete(record.id)}>xoa</Button>
                <Link to={`/todo/edit/${record.id}`}>
                  <Button>sua</Button>
                </Link>
              </Space>
            ),
          },
        ]}
        bordered
        pagination={{ pageSize: 5 }}
      />

    </div>
  );
};

export default TodoList;
