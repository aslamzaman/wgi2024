import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { ItemModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const items = await ItemModel.find({isDeleted: false}).sort({_id:'desc'});
    return NextResponse.json( items );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch items' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { name, description } = await Request.json();
    const items = await ItemModel.create({ name, description });
    return NextResponse.json(items);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}