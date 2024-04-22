import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { SupplierModel } from '@/lib/Models';


// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const suppliers = await SupplierModel.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    return NextResponse.json(suppliers);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
}


// Update data
export const PUT = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const { name, address, contact, isDeleted } = await Request.json();
    const suppliers = await SupplierModel.findOneAndUpdate({ _id: id }, { name, address, contact, isDeleted });
    return NextResponse.json(suppliers);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
export const DELETE = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const suppliers = await SupplierModel.findOneAndDelete({ _id: id });
    return NextResponse.json(suppliers);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 