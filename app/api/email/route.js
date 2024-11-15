import { ConnectDB } from "@/lb/config/mongodb";
import Email from "@/lb/models/EmailModel";
import { NextResponse } from "next/server";


const LoadDb = async () => {
  await ConnectDB();
};

LoadDb();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const emailData = {
      email: `${formData.get("email")}`,
    };
    await Email.create(emailData);
    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (err) {
    return NextResponse.json({ success: false, err: err.message });
  }
}

export async function GET(request) {
  try {
    const email = await Email.find({});
    return NextResponse.json({ email });
  } catch (error) {
    return NextResponse.status(500).json({ error:"An error occurred" });
  }
}

export async function DELETE(request) {
 try {
  const id = await request.nextUrl.searchParams.get('id');
  await Email.findByIdAndDelete(id);
  console.log("deleted");
  return NextResponse.json({ success: true, msg: "Email deleted successfully" });
 } catch (error) {
  return NextResponse.status(500).json({ error: "An error occurred while deleting"})
 }
}