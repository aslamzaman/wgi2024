import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { CustomerModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const customers = await CustomerModel.find({}).sort({_id:'desc'});
    return NextResponse.json( customers );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch customers' }, { status: 500 });
  }
}


export const POST = async (Request) => {
  try {
    await Connect();
    const { name, address, contact } = await Request.json();
    const customers = await CustomerModel.create({ name, address, contact });
    return NextResponse.json(customers);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}

