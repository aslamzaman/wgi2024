import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { ShipmentModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const shipments = await ShipmentModel.find({}).populate('lcid').populate('supplierid').populate('itemid').populate('unitid').sort({_id:'desc'});
    return NextResponse.json( shipments );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch shipments' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { dt, shipmentno, lcid, supplierid, itemid, unitid, qty, taka } = await Request.json();
    const shipments = await ShipmentModel.create({ dt, shipmentno, lcid, supplierid, itemid, unitid, qty, taka });
    return NextResponse.json(shipments);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}