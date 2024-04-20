import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { ShipmentModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const shipments = await PostModel.findById(id);
    return NextResponse.json(shipments);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { dt, shipmentNo, lcId, supplierId, itemId, unittypeId, qty, taka } = await Request.json();
    const shipments = await ShipmentModel.findOneAndUpdate({ _id: id }, { dt, shipmentNo, lcId, supplierId, itemId, unittypeId, qty, taka });
    return NextResponse.json(shipments);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const shipments = await ShipmentModel.findOneAndDelete({_id: id});
    return NextResponse.json(shipments);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 