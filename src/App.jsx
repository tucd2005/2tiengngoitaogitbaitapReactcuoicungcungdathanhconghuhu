
import { Route, Routes } from 'react-router'
import './App.css'
import ProductsList from './ProductsList';

function App() {
  

  return (
    <>
      <Routes>
          <Route path='/' element={<ProductsList/>}/>

      </Routes>
    </>
  )
}

export default App
