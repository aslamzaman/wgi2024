import React, { useState } from "react";
import { TextEn, BtnSubmit, TextDt, TextEnDisabled, DropdownEn } from "@/components/Form";
const date_format = dt => new Date(dt).toISOString().split('T')[0];
import { fetchData } from "@/lib/utils/FetchData";





const Add = ({ message }) => {
    const [dt, setDt] = useState('');
    const [invoiceNo, setInvoiceno] = useState('');
    const [orderNum, setOrderNum] = useState('');
    const [orderNo, setOrderno] = useState('');
    const [shipment, setShipment] = useState('');
    const [deduct, setDeduct] = useState('');
    const [payment, setPayment] = useState('');
    const [customer, setCustomer] = useState({});
    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);

    const [orders, setOrders] = useState([]);

    const resetVariables = () => {
        message("Ready to make new additions");
        setDt(date_format(new Date()));
        setInvoiceno(Math.round(Date.now() / 60000));
        setOrderno('');
        setShipment('');
        setDeduct('');
        setPayment('');
        setCustomer({});
        setItems([]);
    }


    const showAddForm = async () => {
        setShow(true);
        resetVariables();

        try {
            const [responseOrder, responseDelivery] = await Promise.all([
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery`)
            ]);
          //  const result = responseOrder.filter(order=> !responseDelivery.some(delivery =>delivery.orderNo === order.orderNo));
   
            const result = responseOrder.filter(order => 
                responseDelivery.every(delivery => delivery.orderNo !== order.orderNo)
            );

            setOrders(result);
        } catch (error) {
            console.error("Error fetching data:", error);
            setMsg("Failed to fetch data");
        }
    }


    const closeAddForm = () => {
        setShow(false);
        message("Data ready");
    }


    const createObject = () => {
        return {
            dt: dt,
            invoiceNo: invoiceNo,
            orderNo: orderNum,
            shipment: shipment,
            deduct: deduct,
            payment: payment,
            customer: customer,
            items: items
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
                message("Delivery is created!");
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


    const ordernoChangeHandler = (e) => {
        const orderIdValue = e.target.value;
        setOrderno(orderIdValue);
        //---------------------------------------------------
        const result = orders.find(order => order._id === orderIdValue);
        setOrderNum(result.orderNo);
        setCustomer(result.customerId);
        setItems(result.items);
    }



    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-9/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-2 gap-4 my-4">
                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />

                                    <TextEnDisabled Title="Invoice No (Auto)" Id="invoiceNo" Change={e => setInvoiceno(e.target.value)} Value={invoiceNo} Chr={50} />
                                    <DropdownEn Title="Order No" Id="orderNo" Change={ordernoChangeHandler} Value={orderNo}>
                                        {orders.length ? orders.map(order => <option value={order._id} key={order._id}>{order.orderNo}-{order.customerId.name}</option>) : null}
                                    </DropdownEn>

                                    <TextEn Title="Shipment" Id="shipment" Change={e => setShipment(e.target.value)} Value={shipment} Chr={50} />
                                    <TextEn Title="Deduct" Id="deduct" Change={e => setDeduct(e.target.value)} Value={deduct} Chr={50} />
                                    <TextEn Title="Payment" Id="payment" Change={e => setPayment(e.target.value)} Value={payment} Chr={50} />

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

