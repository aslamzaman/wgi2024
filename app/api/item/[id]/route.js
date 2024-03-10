import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { ItemModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const items = await PostModel.findById(id);
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name, description } = await Request.json();
    const items = await ItemModel.findOneAndUpdate({ _id: id }, { name, description });
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const items = await ItemModel.findOneAndDelete({_id: id});
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 