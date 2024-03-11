import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { SalaryModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const salarys = await PostModel.findById(id);
    return NextResponse.json(salarys);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { employee, month, taka, deduct, arear, note } = await Request.json();
    const salarys = await SalaryModel.findOneAndUpdate({ _id: id }, { employee, month, taka, deduct, arear, note });
    return NextResponse.json(salarys);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const salarys = await SalaryModel.findOneAndDelete({_id: id});
    return NextResponse.json(salarys);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 