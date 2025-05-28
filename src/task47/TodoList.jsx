// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import { Button, Space, Table, Tag } from 'antd';

// const TodoList = () => {
//   const [todo, setTodo] = useState([]);

//   // setTodo ở đây dùng để cập nhật lại danh sách todo sau khi xóa 

//   useEffect(() => {
//     const fetchTodo = async () => {
//       // ôn lại kiến thức tí : async await để làm gì nhẻ ? 
//       // async await là hàm bất đồng bộ dùng để xử lý bất đồng bộ nhưng theo cách giống như đồng bộ
//       // nó giúp code : 
//       //  @ dễ đọc hơn
//       //  @ tránh bị callback hell
//       //  @ dễ debug hơn 
//       //  @ ok thằng em trai @ //
//       try {
//         const res = await axios.get(`http://localhost:3000/todo`);
//         setTodo(res.data);
//       } catch (error) {
//         console.log("Có lỗi rồi em yêu ơi", error);
//       }
//     };
//     fetchTodo();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("ban co muon xoa san pham khong");
//     if (!confirm) return;

//     try {
//       await axios.delete(`http://localhost:3000/todo/${id}`);
//       toast.success("Xoa san pham thanh cong");
//       setTodo(currentTodo =>
//         currentTodo.filter(item => item.id !== id)
//       );
//       // ở trong bài này filter dùng để lọc ra các phần tử khác phần tử id và tạo ra 1 mảng mới không có id đó  
//       // filter là gì ? 
//       // filter là 1 phương thức trong mảng của array. Dùng để lọc ra các phần tử thỏa mãn với điều kiện và trả về 1 mảng mới chứa những phần tử đó 

//     } catch (error) {
//       console.log("loi xoa san pham khong thanh cong", error);
//       toast.error("xoa that bai");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1 style={{ textAlign: 'center' }}>Bài task 47 : wellcome building todo</h1>

//       <Button type="primary" style={{ marginBottom: 16 }}>
//         <Link to="/add">thêm todo</Link>
//       </Button>

//       <Table
//         dataSource={todo.map((item, index) => ({ ...item, key: item.id, stt: index + 1 }))}
//         columns={[
//           {
//             title: 'STT',
//             dataIndex: 'stt',
//             key: 'stt',
//           },
//           {
//             title: 'title',
//             dataIndex: 'title',
//             key: 'title',
//           },
//           {
//             title: 'completed',
//             dataIndex: 'completed',
//             key: 'completed',
//             render: (completed) =>
//               completed ? <Tag color="green">da hoan thanh</Tag> : <Tag color="red">chua hoan thanh</Tag>,
//           },
//           {
//             title: 'createdAt',
//             dataIndex: 'createdAt',
//             key: 'createdAt',
//           },
//           {
//             title: 'priority',
//             dataIndex: 'priority',
//             key: 'priority',
//           },
//           {
//             title: 'description',
//             dataIndex: 'description',
//             key: 'description',
//           },
//           {
//             title: 'active',
//             key: 'action',
//             render: (_, record) => (
//               <Space size="middle">
//                 <Button danger onClick={() => handleDelete(record.id)}>xoa</Button>
//                 <Link to={`/edit/${record.id}`}>
//                   <Button>sua</Button>
//                 </Link>
//               </Space>
//             ),
//           },
//         ]}
//         bordered
//         pagination={{ pageSize: 5 }}
//       />

//     </div>
//   );
// };

// export default TodoList;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Space, Table, Tag, Input, Select } from 'antd'; // Import Input and Select

const { Search } = Input;
const { Option } = Select;

const TodoList = () => {
  const [todo, setTodo] = useState([]);
  const [searchText, setSearchText] = useState(''); // State for search text
  const [filterStatus, setFilterStatus] = useState('all'); // State for filter by completion status
  const [sortBy, setSortBy] = useState('createdAt'); // State for sorting by
  const [sortOrder, setSortOrder] = useState('asc'); // State for sort order

  useEffect(() => {
    const fetchTodo = async () => {
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
    const confirm = window.confirm("Bạn có muốn xóa sản phẩm không?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      toast.success("Xóa sản phẩm thành công");
      setTodo(currentTodo =>
        currentTodo.filter(item => item.id !== id)
      );
    } catch (error) {
      console.log("Lỗi xóa sản phẩm không thành công", error);
      toast.error("Xóa thất bại");
    }
  };

  // --- Filtering Logic ---
  const filteredTodo = todo.filter(item => {
    // Filter by search text
    const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchText.toLowerCase());

    // Filter by completion status
    const matchesStatus = filterStatus === 'all' ||
                          (filterStatus === 'completed' && item.completed) ||
                          (filterStatus === 'uncompleted' && !item.completed);

    return matchesSearch && matchesStatus;
  });

  // --- Sorting Logic ---
  const sortedTodo = [...filteredTodo].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'createdAt' || sortBy === 'priority') {
      if (a[sortBy] < b[sortBy]) {
        comparison = -1;
      } else if (a[sortBy] > b[sortBy]) {
        comparison = 1;
      }
    } else if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div style={{ padding: 20 }}>
      <ToastContainer />
      <h1 style={{ textAlign: 'center' }}>Bài task 47 : wellcome building todo</h1>

      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Button type="primary">
          <Link to="/add">thêm todo</Link>
        </Button>

        {/* Search Input */}
        <Search
          placeholder="Tìm kiếm theo tiêu đề hoặc mô tả"
          allowClear
          onSearch={setSearchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />

        {/* Filter by Status */}
        <Select
          defaultValue="all"
          style={{ width: 150 }}
          onChange={setFilterStatus}
        >
          <Option value="all">Tất cả</Option>
          <Option value="completed">Đã hoàn thành</Option>
          <Option value="uncompleted">Chưa hoàn thành</Option>
        </Select>

        {/* Sort By */}
        <Select
          defaultValue="createdAt"
          style={{ width: 150 }}
          onChange={setSortBy}
        >
          <Option value="createdAt">Ngày tạo</Option>
          <Option value="title">Tiêu đề</Option>
          <Option value="priority">Độ ưu tiên</Option>
        </Select>

        {/* Sort Order */}
        <Select
          defaultValue="asc"
          style={{ width: 120 }}
          onChange={setSortOrder}
        >
          <Option value="asc">Tăng dần</Option>
          <Option value="desc">Giảm dần</Option>
        </Select>
      </Space>

      <Table
        dataSource={sortedTodo.map((item, index) => ({ ...item, key: item.id, stt: index + 1 }))}
        columns={[
          {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
          },
          {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'Hoàn thành',
            dataIndex: 'completed',
            key: 'completed',
            render: (completed) =>
              completed ? <Tag color="green">đã hoàn thành</Tag> : <Tag color="red">chưa hoàn thành</Tag>,
          },
          {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
          },
          {
            title: 'Độ ưu tiên',
            dataIndex: 'priority',
            key: 'priority',
          },
          {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button danger onClick={() => handleDelete(record.id)}>Xóa</Button>
                <Link to={`/edit/${record.id}`}>
                  <Button>Sửa</Button>
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