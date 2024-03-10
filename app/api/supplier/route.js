import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { SupplierModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const suppliers = await SupplierModel.find({}).sort({_id:'desc'});
    return NextResponse.json( suppliers );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch suppliers' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { name, address, contact } = await Request.json();
    const suppliers = await SupplierModel.create({ name, address, contact });
    return NextResponse.json(suppliers);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}