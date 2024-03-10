import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { CustomerModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const customers = await CustomerModel.find({}).sort({name:'asc'});
    return NextResponse.json( customers );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch customers' }, { status: 500 });
  }
}