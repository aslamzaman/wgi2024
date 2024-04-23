import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { DeliveryModel } from '@/lib/Models';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const deliverys = await DeliveryModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(deliverys);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { dt, invoiceNo, orderId, shipment, deduct, advance } = await Request.json();
    const deliverys = await DeliveryModel.findOneAndUpdate({ _id: id }, { dt, invoiceNo, orderId, shipment, deduct, advance });
    return NextResponse.json(deliverys);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
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