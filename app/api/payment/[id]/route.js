import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { PaymentModel } from '@/lib/Models';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const payments = await PaymentModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(payments);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { customerId, dt, cashtypeId, bank, taka } = await Request.json();
    const payments = await PaymentModel.findOneAndUpdate({ _id: id }, { customerId, dt, cashtypeId, bank, taka });
    return NextResponse.json(payments);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const payments = await PaymentModel.findOneAndDelete({_id: id});
    return NextResponse.json(payments);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 