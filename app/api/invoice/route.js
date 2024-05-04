import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { InvoiceModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const invoices = await InvoiceModel.find({isDeleted: false}).populate('customerId').sort({_id:'desc'});
    return NextResponse.json( invoices );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch invoices' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { invoiceNumber, customerId, dt, shipment, deduct, payment, items } = await Request.json();
    const invoices = await InvoiceModel.create({ invoiceNumber, customerId, dt, shipment, deduct, payment, items });
    return NextResponse.json(invoices);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}