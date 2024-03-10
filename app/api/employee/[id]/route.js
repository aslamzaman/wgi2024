import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { EmployeeModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const employees = await PostModel.findById(id);
    return NextResponse.json(employees);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name, address, post_id, salary, join_dt, contact } = await Request.json();
    const employees = await EmployeeModel.findOneAndUpdate({ _id: id }, { name, address, post_id, salary, join_dt, contact });
    return NextResponse.json(employees);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const employees = await EmployeeModel.findOneAndDelete({_id: id});
    return NextResponse.json(employees);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 