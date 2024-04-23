import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { MoneyreceiptModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const moneyreceipts = await MoneyreceiptModel.find({isDeleted: false}).populate('cashtypeId').sort({_id:'desc'});
    return NextResponse.json( moneyreceipts );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch moneyreceipts' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { dt, receiveNo, receivedFrom, taka, cashtypeId, bankName, chequeNo, chequeDt, purpose, contact } = await Request.json();
    const moneyreceipts = await MoneyreceiptModel.create({ dt, receiveNo, receivedFrom, taka, cashtypeId, bankName, chequeNo, chequeDt, purpose, contact });
    return NextResponse.json(moneyreceipts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}