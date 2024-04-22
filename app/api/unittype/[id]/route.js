import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { UnittypeModel } from '@/lib/Models';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const unittypes = await UnittypeModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(unittypes);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name } = await Request.json();
    const unittypes = await UnittypeModel.findOneAndUpdate({ _id: id }, { name });
    return NextResponse.json(unittypes);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const unittypes = await UnittypeModel.findOneAndDelete({_id: id});
    return NextResponse.json(unittypes);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 