import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { LcModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const lcs = await PostModel.findById(id);
    return NextResponse.json(lcs);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


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