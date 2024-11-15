'use client'
import BlogList from "@/Component/BlogList";
import Footer from "@/Component/Footer";
import Header from "@/Component/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <>
    <ToastContainer theme="dark"/>
      <Header/>
      <BlogList/>
      <Footer/>
    </>  );
}
