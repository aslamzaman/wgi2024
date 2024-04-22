import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { EmployeeModel } from '@/lib/Models';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const employees = await EmployeeModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(employees);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name, address, postId, salary, joinDt, contact, isDeleted } = await Request.json();
    const employees = await EmployeeModel.findOneAndUpdate({ _id: id }, { name, address, postId, salary, joinDt, contact, isDeleted });
    return NextResponse.json(employees);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
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