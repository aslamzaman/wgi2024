import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { SalaryModel } from '@/lib/Models';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const salarys = await SalaryModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(salarys);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { employeeId, month, taka, deduct, arear, note } = await Request.json();
    const salarys = await SalaryModel.findOneAndUpdate({ _id: id }, { employeeId, month, taka, deduct, arear, note });
    return NextResponse.json(salarys);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
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