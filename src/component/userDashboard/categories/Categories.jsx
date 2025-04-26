import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
function Categories() {
  const getCategories=async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/category`)
    return data.categories;
  }
  console.log(getCategories())
  const query=useQuery({
    queryKey:['categories'],
    queryFn:getCategories
  })
  const { isLoading, error, data:categories } = query;
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      <h2>All Categories</h2>
      {categories?.length?categories.map((category,index)=>
        <div key={category._id}>
          <h4 >{category.name}</h4> 
          <p>ID: {category._id}</p>
        </div>
      ):<h2>no categories Found</h2>}
    </div>
  );
}

export default Categories;

/* react query best than useeffect way because"
  useQuery will fetch the data only when the query key changes.
  useEffect will fetch the data every time the component re-renders.
  " */
 /*
  useQuery will also cache the data in the browser's local storage, and it will automatically fetch the data from the cache when the component re-renders.
  useEffect will not cache the data in the browser's local storage, and it will always fetch the data from the server when the component re-renders.
  " */
/*
  useQuery 
 server state فيها خاصيه
api يعني بتضل تراقب ب 
  اي تغيير عليه مباشره بتعدلو اوتاماتيكي
  عكس useeffct
  لازم تعمل reffresh
  
*/