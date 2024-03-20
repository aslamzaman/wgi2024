import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { OrderModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const orders = await OrderModel.find({
        createdAt: {
            $gte: new Date('2024-03-17'), 
            $lt: new Date('2024-03-18')
        }
    }).populate('customerId').populate('itemId').populate('unitId').sort({_id:'desc'});
    return NextResponse.json( orders );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
  }
}
