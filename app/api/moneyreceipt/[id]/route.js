import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { MoneyreceiptModel } from '@/lib/Models';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const moneyreceipts = await MoneyreceiptModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(moneyreceipts);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { dt, receiveNo, receivedFrom, taka, cashtypeId, bankName, chequeNo, chequeDt, purpose, contact } = await Request.json();
    const moneyreceipts = await MoneyreceiptModel.findOneAndUpdate({ _id: id }, { dt, receiveNo, receivedFrom, taka, cashtypeId, bankName, chequeNo, chequeDt, purpose, contact });
    return NextResponse.json(moneyreceipts);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const moneyreceipts = await MoneyreceiptModel.findOneAndDelete({_id: id});
    return NextResponse.json(moneyreceipts);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 