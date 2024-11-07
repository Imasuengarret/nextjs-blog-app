"use client";
import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);
      const response = await axios.post("/api/blogs", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Blog Title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />
        <p className="text-xl mt-4">Blog Descripton</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Write content here"
          required
          rows={6}
        />
        <p className="text-xl mt-4">Blog Category</p>
        <select
          onChange={onChangeHandler}
          value={data.category}
          name="category"
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          ADD
        </button>
      </form>
    </>
  );
};

export default page;

// 'use client'
// import { assets } from '@/assets/assets'
// import axios from 'axios'
// import Image from 'next/image'
// import React, { useState } from 'react'
// import { toast } from 'react-toastify'

// const page = () => {
//     const [image, setImage] = useState(false)
//     const [data, setData] = useState({
//       title: '',
//       description: '',
//       category: 'startup',
//       author: 'Garret',
//       authorImg: '/author_img.png',
//     })

//     const onChangeHandler = (event) =>{
//       const name = event.target.name;
//       const value = event.target.value;
//       setData((data) => ({...data, [name] : value}))
//       console.log(data)
//     }
//     const onSubmitHandler = async(event) => {
//     try {
//       event.preventDefault();
//       const formData = new FormData();
//       formData.append('title', data.title)
//       formData.append('description', data.description)
//       formData.append('category', data.category)
//       formData.append('author', data.author)
//       formData.append('authorImg', data.authorImg)
//       formData.append('image', data.image)
//       const response = await axios.post('/api/blogs', formData)
//       if (response.data.success){
//         toast.success(response.data.msg)
//       } else{
//         toast.error(response.data.err)
//       }
//     } catch (error) {

//     }}

//   return (
//        <>
//       <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={onSubmitHandler}>
//         <p className="text-xl">Upload Thumbnail</p>
//         <label htmlFor="image">
//           <Image
//             className="mt-4"
//             src={!image? assets.upload_area : URL.createObjectURL(image)}
//             width={140}
//             height={70}
//             alt=""
//           />
//         </label>
//         <input type="file" id="image" hidden required onChange={(e)=>setImage(e.target.files[0])}/>
//         <p className="text-xl mt-4">Blog Title</p>
//         <input
//           className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
//           type="text"
//           placeholder="Type here"
//           required
//           name='title'
//           onChange={onChangeHandler}
//           value={data.title}
//         />
//         <p className="text-xl mt-4">Blog Descripton</p>
//         <textarea
//           className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
//           type="text"
//           placeholder="Write content here"
//           required
//           rows={6}
//           name='description'
//           onChange={onChangeHandler}
//           value={data.description}
//         />
//         <p className="text-xl mt-4">Blog Category</p>
//         <select className="w-40 mt-4 px-4 py-3 border text-gray-500" onChange={onChangeHandler}>
//           <option value="Startup">Startup</option>
//           <option value="Technology">Technology</option>
//           <option value="Lifestyle">Lifestyle</option>
//         </select>
//         <br />
//         <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
//           ADD
//         </button>
//       </form>
//     </>
//   )
// }

// export default page
