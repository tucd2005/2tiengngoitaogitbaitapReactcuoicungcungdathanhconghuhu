import React from 'react'
import useFetchList from './hook/useFetchList'
import useQuery from './hook/useQuery'


const sortOptions = [
  {lable: "sap xep", value: {}},
  {lable: "gia tang dan", value: {sortBy: "price", order: "asc"}},
  {lable: "gia giam dan", value: {sortBy: "price", order: "desc"}},
  {lable: "ten tu a -> z", value: {sortBy: "title", order: "asc"}},
  {lable: "ten tu z -> a", value: {sortBy: "title", order: "desc"}},
  {lable: "luot danh gia cao nhat", value: {sortBy: "rating", order: "desc"}},

]

const ProductsList = () => {


    const [query, updateQuery, resetQuery] = useQuery({
      q: "",
        page: 1, 
        limit: 12, 
        sortBy: "title",
        order: "asc",
    })
    const [data] = useFetchList("products", query,{}) // config mặc định bằng rỗng

    const handleSearch = (data) => { 
      updateQuery({q: data,page: 1})
    }

    const handleSort = (indexOtp) => {
      console.log(indexOtp);
      const opt = sortOptions[indexOtp].value;
      updateQuery({...opt, page : 1})
      
    }

    const handlePage = (newPage) => {
      updateQuery({page:newPage})
    }
    const handleLimit = (limit) => {
      updateQuery({limit, page:1})
    }
  return (
    <>
    <h1>Danh sach san pham</h1><div>ProductsList</div>
    <p>
      <span>Hien thi toi da</span>
      <select name="" id="" onChange={(e) => handleLimit(e.target.value)} value={query.limit}  className="border-2 border-green-700">
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="16">16</option>
        <option value="24">24</option>
      </select>
    </p>
    <input type="text" onChange={(e) => handleSearch(e.target.value )} className="border-2 border-green-700"/>
    <select name="" id="" onChange={(e)=>handleSort(e.target.value)} className="border-2 border-green-700">
      {sortOptions.map((opt, index) => (
        <option key={index} value={index} >{opt.lable}</option>
      )) }
    </select>

    <button className="border-2 border-green-700">gdffggd</button>
    <div>
      {data && data.map(item => {
        return(

          <div key={item.id}>
          <h2>{item.title}</h2>
          <p>Price: {item.price}</p>
        </div>
        )
      })}
    </div>

    <button className="border-2 border-green-700" onClick={() => handlePage(query.page-1)} disabled={query.page === 1}>Prev </button>
    <span>Page: {query.page}</span>
    <button className="border-2 border-green-700" onClick={() => handlePage(query.page+1)} >Next</button>
    </>
  )
}

export default ProductsList