import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { CustomerModel } from '@/lib/Models';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const customers = await CustomerModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(customers);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name, address, contact, isDeleted } = await Request.json();
    const customers = await CustomerModel.findOneAndUpdate({ _id: id }, { name, address, contact, isDeleted });
    return NextResponse.json(customers);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
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