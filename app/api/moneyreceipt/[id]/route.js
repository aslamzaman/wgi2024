import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { MoneyreceiptModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const moneyreceipts = await PostModel.findById(id);
    return NextResponse.json(moneyreceipts);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { dt, receiveNo, receivedFrom, taka, cashType, bankName, chequeNo, chequeDt, purpose, contact } = await Request.json();
    const moneyreceipts = await MoneyreceiptModel.findOneAndUpdate({ _id: id }, { dt, receiveNo, receivedFrom, taka, cashType, bankName, chequeNo, chequeDt, purpose, contact });
    return NextResponse.json(moneyreceipts);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


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