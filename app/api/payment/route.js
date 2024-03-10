import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { PaymentModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const payments = await PaymentModel.find({}).populate('customerid').populate('cashtypeid').sort({_id:'desc'});
    return NextResponse.json( payments );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch payments' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { customerid, dt, cashtypeid, bank, taka } = await Request.json();
    console.log(customerid, dt, cashtypeid, bank, taka)
    const payments = await PaymentModel.create(
      { 
        customerid:customerid,
        dt:dt,
        cashtypeid:cashtypeid,
        bank:bank,
        taka:taka 
      }
      );
    return NextResponse.json(payments);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}