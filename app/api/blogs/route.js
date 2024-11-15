import { ConnectDB } from "@/lb/config/mongodb";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import Blog from "@/lb/models/BlogModel";
const fs = require("fs");

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();
export const GET = async (request) => {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await Blog.findById(blogId);
      return NextResponse.json(blog);
    } else {
      const blogs = await Blog.find({});
      return NextResponse.json({ blogs });
    }
  } catch (err) {
    return NextResponse.status(404).json({ err: "An error occured" });
  }
};

export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();
    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
    console.log(imgUrl);

    const blogData = {
      title: `${formData.get("title")}`,
      description: `${formData.get("description")}`,
      category: `${formData.get("category")}`,
      author: `${formData.get("author")}`,
      image: `${imgUrl}`,
      authorImg: `${formData.get("authorImg")}`,
    };
    await Blog.create(blogData);
    console.log("created");

    return NextResponse.json(
      { success: true, msg: "success" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "An error occured" });
  }
};

export const DELETE = async (req) => {
  try {
    const id = await req.nextUrl.searchParams.get("id");
    const blog = await Blog.findById(id);
    fs.unlink(`./public/${blog.image}`, () => {});
    await Blog.findByIdAndDelete(id);
    console.log("deleted");
    return NextResponse.json(
      { success: true, msg: "success" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "An error occured" });
  }
};
