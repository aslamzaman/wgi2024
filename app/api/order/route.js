import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { OrderModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const orders = await OrderModel.find({}).populate('customerId').populate('itemId').populate('unitId').sort({_id:'desc'});
    return NextResponse.json( orders );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { dt, orderno, customerId, itemId, unitId, qty, taka, delivery } = await Request.json();
    const orders = await OrderModel.create({ dt, orderno, customerId, itemId, unitId, qty, taka, delivery });
    return NextResponse.json(orders);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}