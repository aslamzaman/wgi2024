import React, { useState } from "react";
import { TextEn, BtnSubmit, DropdownEn, TextDt, TextEnDisabled, TextNum } from "@/components/Form";
import { GetRemoteData } from "@/lib/utils/GetRemoteData";
const date_format = dt => new Date(dt).toISOString().split('T')[0];



const Add = ({ message }) => {
    const [dt, setDt] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [orderId, setOrderId] = useState('');
    const [shipment, setShipment] = useState('');
    const [deduct, setDeduct] = useState('');
    const [advance, setAdvance] = useState('');
   

    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState([]);




    const resetVariables = () => {
        setDt(date_format(new Date()));
        setInvoiceNo(Math.round(Date.now()/60000));
        setOrderId('');
        setShipment('');
        setDeduct('');
        setAdvance('');
    }


    const showAddForm = async () => {
        setShow(true);
        resetVariables();
        try {
            const responseOrder = await GetRemoteData('order');
            const responseDelivery = await GetRemoteData('delivery');
            const filterWithOutDelivery = responseOrder.filter(order=>!responseDelivery.some(delivery=>delivery.orderId._id === order._id));
          //  console.log(responseOrder, responseDelivery,filterWithOutDelivery)
            setOrders(filterWithOutDelivery);
        } catch (error) {
            console.error('Failed to fetch delivery data:', error);
        }
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
        return {
            dt: dt,
            invoiceNo: invoiceNo,
            orderId: orderId,
            shipment: shipment,
            deduct: deduct,
            advance: advance
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery`;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message(`Delivery is created at ${new Date().toISOString()}`);
            } else {
                throw new Error("Failed to create delivery");
            }
        } catch (error) {
            console.error("Error saving delivery data:", error);
            message("Error saving delivery data.");
        } finally {
            setShow(false);
        }
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Delivery Data</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <TextEnDisabled Title="Invoice No" Id="invoiceNo" Change={e => setInvoiceNo(e.target.value)} Value={invoiceNo} Chr={50} />

                                    <DropdownEn Title="Order" Id="orderId" Change={e => setOrderId(e.target.value)} Value={orderId}>
                                        {orders.length ? orders.map(order => <option value={order._id} key={order._id}>{order.orderNo}-{order.customerId.name}</option>) : null}
                                    </DropdownEn>
                                    <TextEn Title="Shipment" Id="shipment" Change={e => setShipment(e.target.value)} Value={shipment} Chr={50} />
                                    <TextNum Title="Deduct" Id="deduct" Change={e => setDeduct(e.target.value)} Value={deduct} />
                                    <TextNum Title="Advance" Id="advance" Change={e => setAdvance(e.target.value)} Value={advance} />
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showAddForm} className="px-1 py-1 bg-blue-500 hover:bg-blue-700 rounded-md transition duration-500" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default Add;

