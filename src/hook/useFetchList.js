import React, { useEffect, useState } from 'react'
import api from './../axios/index';


const useFetchList = (path, query, config = {}) => {
    const [data, setData] = useState([])
    useEffect(()=> {
        const fetchAPI = async() => {
            const skip = (query.page-1)*query.limit
            query.skip = skip
            // delete query.page
            const queryString = new URLSearchParams(query).toString()
         const res = await api.get(`${path}/search?${queryString}`, config)
         console.log(res.data[path]);
         
         setData(res.data[path])
    } 
        fetchAPI()
    }, [path, JSON.stringify(query), JSON.stringify(config)])

    return [data]
}

export default useFetchList 