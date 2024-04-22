import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { ShipmentModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const shipments = await ShipmentModel.find({isDeleted: false}).populate('lcId').populate('supplierId').populate('itemId').populate('unittypeId').sort({_id:'desc'});
    return NextResponse.json( shipments );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch shipments' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { dt, shipmentNo, lcId, supplierId, itemId, unittypeId, qty, taka } = await Request.json();
    const shipments = await ShipmentModel.create({ dt, shipmentNo, lcId, supplierId, itemId, unittypeId, qty, taka });
    return NextResponse.json(shipments);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}