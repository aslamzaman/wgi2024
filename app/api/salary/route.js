import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { SalaryModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const salarys = await SalaryModel.find({isDeleted: false}).populate('employeeId').sort({_id:'desc'});
    return NextResponse.json( salarys );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch salarys' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { employeeId, month, taka, deduct, arear, note } = await Request.json();
    const salarys = await SalaryModel.create({ employeeId, month, taka, deduct, arear, note });
    return NextResponse.json(salarys);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}