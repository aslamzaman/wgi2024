import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { InvoiceModel } from '@/lib/Models';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const invoices = await InvoiceModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(invoices);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { invoiceNumber, customerId, dt, shipment, deduct, payment, items } = await Request.json();
    const invoices = await InvoiceModel.findOneAndUpdate({ _id: id }, { invoiceNumber, customerId, dt, shipment, deduct, payment, items });
    return NextResponse.json(invoices);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
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