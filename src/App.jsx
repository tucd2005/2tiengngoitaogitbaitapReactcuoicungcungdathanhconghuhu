
import { Route, Routes } from 'react-router'
import './App.css'
import ProductsList from './ProductsList';
import TodoList from './task47/TodoList';
import TodoAdd from './task47/TodoAdd';
import TodoEdit from './task47/TodoEdit';
import { ToastContainer } from 'react-toastify';

function App() {
  

  return (
    <>
      <Routes>
          <Route path='/task46' element={<ProductsList/>}/>
          <Route path='/todo' element={<TodoList/>}/>
          <Route path='/todo/add' element={<TodoAdd/>}/>
          <Route path='/todo/edit:id' element={<TodoEdit/>}/>

        
      </Routes>
      <ToastContainer />

    </>
  )
}

export default App
