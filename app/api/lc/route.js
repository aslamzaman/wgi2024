import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { LcModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const lcs = await LcModel.find({}).populate('unittypeid').sort({_id:'desc'});
    return NextResponse.json( lcs );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch lcs' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { dt, lcno, qty, unittypeid, taka } = await Request.json();
    const lcs = await LcModel.create({ dt, lcno, qty, unittypeid, taka });
    return NextResponse.json(lcs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}