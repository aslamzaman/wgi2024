import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { InvoiceModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const invoices = await PostModel.findById(id);
    return NextResponse.json(invoices);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { dt, invoiceno, shipment, customer, item, deduct, payment } = await Request.json();
    const invoices = await InvoiceModel.findOneAndUpdate({ _id: id }, { dt, invoiceno, shipment, customer, item, deduct, payment });
    return NextResponse.json(invoices);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const invoices = await InvoiceModel.findOneAndDelete({_id: id});
    return NextResponse.json(invoices);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 