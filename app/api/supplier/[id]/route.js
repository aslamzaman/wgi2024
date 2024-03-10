import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { SupplierModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const suppliers = await PostModel.findById(id);
    return NextResponse.json(suppliers);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name, address, contact } = await Request.json();
    const suppliers = await SupplierModel.findOneAndUpdate({ _id: id }, { name, address, contact });
    return NextResponse.json(suppliers);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const suppliers = await SupplierModel.findOneAndDelete({_id: id});
    return NextResponse.json(suppliers);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 