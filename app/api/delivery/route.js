import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { DeliveryModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const deliverys = await DeliveryModel.find({isDeleted: false}).populate('orderId').sort({_id:'desc'});
    return NextResponse.json( deliverys );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch deliverys' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { dt, invoiceNo, orderId, shipment, deduct, advance } = await Request.json();
    const deliverys = await DeliveryModel.create({ dt, invoiceNo, orderId, shipment, deduct, advance });
    return NextResponse.json(deliverys);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}