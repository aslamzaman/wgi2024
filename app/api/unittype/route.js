import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { UnittypeModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const unittypes = await UnittypeModel.find({}).sort({_id:'desc'});
    return NextResponse.json( unittypes );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch unittypes' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { name } = await Request.json();
    const unittypes = await UnittypeModel.create({ name });
    return NextResponse.json(unittypes);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}