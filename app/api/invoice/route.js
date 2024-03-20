import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { InvoiceModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const invoices = await InvoiceModel.find({}).sort({_id:'desc'});
    return NextResponse.json( invoices );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch invoices' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { dt, invoiceno, shipment, customer, item, deduct, payment } = await Request.json();
    const invoices = await InvoiceModel.create({ dt, invoiceno, shipment, customer, item, deduct, payment });
    return NextResponse.json(invoices);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}