import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { OrderModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const orders = await PostModel.findById(id);
    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { dt, deliveryDt, orderNo, customerId, items } = await Request.json();
    const orders = await OrderModel.findOneAndUpdate({ _id: id }, { dt, deliveryDt, orderNo, customerId, items });
    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const orders = await OrderModel.findOneAndDelete({_id: id});
    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 