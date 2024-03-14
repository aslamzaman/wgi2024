import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { DeliveryModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const deliverys = await PostModel.findById(id);
    return NextResponse.json(deliverys);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { dt, orderid, customerid, qty, taka } = await Request.json();
    const deliverys = await DeliveryModel.findOneAndUpdate({ _id: id }, { dt, orderid, customerid, qty, taka });
    return NextResponse.json(deliverys);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const deliverys = await DeliveryModel.findOneAndDelete({_id: id});
    return NextResponse.json(deliverys);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 