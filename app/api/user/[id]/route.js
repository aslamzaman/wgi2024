import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { UserModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const users = await PostModel.findById(id);
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { user_name, pw } = await Request.json();
    const users = await UserModel.findOneAndUpdate({ _id: id }, { user_name, pw });
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const users = await UserModel.findOneAndDelete({_id: id});
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 