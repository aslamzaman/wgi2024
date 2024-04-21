import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { PaymentModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const payments = await PostModel.findById(id);
    return NextResponse.json(payments);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { customerObject, dt, cashtypeObject, bank, taka } = await Request.json();
    const payments = await PaymentModel.findOneAndUpdate({ _id: id }, { customerObject, dt, cashtypeObject, bank, taka });
    return NextResponse.json(payments);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


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