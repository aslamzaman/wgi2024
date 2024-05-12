import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { LoanModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const loans = await LoanModel.find({isDeleted: false}).populate('borrowerId').sort({_id:'desc'});
    return NextResponse.json( loans );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch loans' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { borrowerId, dt, taka, remarks } = await Request.json();
    const loans = await LoanModel.create({ borrowerId, dt, taka, remarks });
    return NextResponse.json(loans);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}