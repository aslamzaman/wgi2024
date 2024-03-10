import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { PostModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const posts = await PostModel.findById(id);
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name, shortname } = await Request.json();
    const posts = await PostModel.findOneAndUpdate({ _id: id }, { name, shortname });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const posts = await PostModel.findOneAndDelete({_id: id});
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 