import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { UserModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const users = await UserModel.find({}).sort({_id:'desc'});
    return NextResponse.json( users );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { user_name, pw } = await Request.json();
    const users = await UserModel.create({ user_name, pw });
    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}