import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { LcModel } from '@/lib/Models';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const lcs = await LcModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(lcs);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { dt, lcNo, qty, unittypeId, taka } = await Request.json();
    const lcs = await LcModel.findOneAndUpdate({ _id: id }, { dt, lcNo, qty, unittypeId, taka });
    return NextResponse.json(lcs);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const lcs = await LcModel.findOneAndDelete({_id: id});
    return NextResponse.json(lcs);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 