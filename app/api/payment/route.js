import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { PaymentModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const payments = await PaymentModel.find({}).populate('customerObject').populate('cashtypeObject').sort({_id:'desc'});
    return NextResponse.json( payments );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch payments' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { customerObject, dt, cashtypeObject, bank, taka } = await Request.json();
    const payments = await PaymentModel.create({ customerObject, dt, cashtypeObject, bank, taka });
    return NextResponse.json(payments);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}