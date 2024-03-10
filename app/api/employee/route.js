import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { EmployeeModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    //const employees = await EmployeeModel.find({}).populate("post_id").sort({_id:'desc'});
    const employees = await EmployeeModel.find({}).populate("post_id").sort({_id:'desc'});
    console.log(employees)
    return NextResponse.json( employees );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch employees' }, { status: 500 });
  }

  
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { name, address, post_id, salary, join_dt, contact } = await Request.json();
    const employees = await EmployeeModel.create({ name, address, post_id, salary, join_dt, contact });
    return NextResponse.json(employees);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}