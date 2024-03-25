import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { CustomerModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const customers = await PostModel.findById(id);
    return NextResponse.json(customers);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name, address, contact } = await Request.json();
    const customers = await CustomerModel.findOneAndUpdate({ _id: id }, { name, address, contact });
    return NextResponse.json(customers);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const customers = await CustomerModel.findOneAndDelete({_id: id});
    return NextResponse.json(customers);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 