import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { EmployeeModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const employees = await EmployeeModel.find({}).populate('postId').sort({_id:'desc'});
    return NextResponse.json( employees );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch employees' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { name, address, postId, salary, joinDt, contact } = await Request.json();
    const employees = await EmployeeModel.create({ name, address, postId, salary, joinDt, contact });
    return NextResponse.json(employees);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}