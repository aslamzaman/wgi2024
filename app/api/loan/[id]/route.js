import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { LoanModel } from '@/lib/Models';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const loans = await LoanModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(loans);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { borrowerId, dt, taka, remarks } = await Request.json();
    const loans = await LoanModel.findOneAndUpdate({ _id: id }, { borrowerId, dt, taka, remarks });
    return NextResponse.json(loans);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const loans = await LoanModel.findOneAndDelete({_id: id});
    return NextResponse.json(loans);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 