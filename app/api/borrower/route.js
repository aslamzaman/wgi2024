import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { BorrowerModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const borrowers = await BorrowerModel.find({isDeleted: false}).sort({_id:'desc'});
    return NextResponse.json( borrowers );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch borrowers' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { name, contact, remarks } = await Request.json();
    const borrowers = await BorrowerModel.create({ name, contact, remarks });
    return NextResponse.json(borrowers);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}