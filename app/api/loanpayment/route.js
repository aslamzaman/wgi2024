import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { LoanpaymentModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const loanpayments = await LoanpaymentModel.find({isDeleted: false}).populate('borrowerId').sort({_id:'desc'});
    return NextResponse.json( loanpayments );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch loanpayments' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { borrowerId, dt, taka, remarks } = await Request.json();
    const loanpayments = await LoanpaymentModel.create({ borrowerId, dt, taka, remarks });
    return NextResponse.json(loanpayments);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}