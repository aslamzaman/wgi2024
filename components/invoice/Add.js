import React, { useState } from "react";
import { TextEn, BtnSubmit, TextDt, TextEnDisabled } from "@/components/Form";
const date_format = dt => new Date(dt).toISOString().split('T')[0];


const Add = ({ message }) => {
    const [dt, setDt] = useState('');
    const [invoiceno, setInvoiceno] = useState('');
    const [shipment, setShipment] = useState('');
    const [customer, setCustomer] = useState('');
    const [item, setItem] = useState('');
    const [deduct, setDeduct] = useState('');
    const [payment, setPayment] = useState('');
    const [show, setShow] = useState(false);

    const [items, setItems] = useState([]);

    const [newItem, setNewItem] = useState('');
    const [newUnit, setNewUnit] = useState('');
    const [newQty, setNewQty] = useState('');
    const [newRate, setNewRate] = useState('');
    const [msg, setMsg] = useState("Ready");

    const resetVariables = () => {
        const createInvoice = Math.round((Date.now() / 1000) / 60);
        message("Ready to make new additions");
        setDt(date_format(new Date()));
        setInvoiceno(createInvoice);
        setShipment('');
        setCustomer('');
        setItem('');
        setDeduct('');
        setPayment('');
    }


    const showAddForm = () => {
        setShow(true);
        resetVariables();
    }


    const closeAddForm = () => {
        setShow(false);
        message("Data ready");
    }


    const createObject = () => {
        return {
            dt: dt,
            invoiceno: invoiceno,
            shipment: shipment,
            customer: customer,
            item: item,
            deduct: deduct,
            payment: payment
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice`;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message("Invoice is created!");
            } else {
                throw new Error("Failed to create invoice");
            }
        } catch (error) {
            console.error("Error saving invoice data:", error);
            message("Error saving invoice data.");
        } finally {
            setShow(false);
        }
    }


    const itemAddHandler = () => {
        const id = Date.now();
        let obj = {
            id: id,
            name: newItem,
            rate: newRate,
            unit: newUnit,
            qty: newQty
        }

        items.push(obj);
        setMsg(id);
        console.log(obj)
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-9/12 xl:w-7/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 pb-6 text-black">

                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid grid-cols-1 gap-1 my-1">
                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <TextEnDisabled Title="Invoice No (Auto)" Id="invoiceno" Change={e => setInvoiceno(e.target.value)} Value={invoiceno} Chr={50} />
                                    <TextEn Title="Shipment" Id="shipment" Change={e => setShipment(e.target.value)} Value={shipment} Chr={50} />
                                    <TextEn Title="Customer" Id="customer" Change={e => setCustomer(e.target.value)} Value={customer} Chr={50} />
                                    <TextEn Title="Item" Id="item" Change={e => setItem(e.target.value)} Value={item} Chr={50} />
                                    <TextEn Title="Deduct" Id="deduct" Change={e => setDeduct(e.target.value)} Value={deduct} Chr={50} />
                                    <TextEn Title="Payment" Id="payment" Change={e => setPayment(e.target.value)} Value={payment} Chr={50} />
                                </div>

                                <div className="col-span-2">
                                    <div className="flex justify-end">
                                        <button onClick={itemAddHandler} className="bg-blue-600 hover:bg-blue-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer">Add Item</button>

                                    </div>
                                    <p>{msg}</p>
                                    <div className="grid grid-cols-5 gap-4 mb-4">
                                        <div className="col-span-2">
                                            <TextEn Title="Item" Id="newItem" Change={e => setNewItem(e.target.value)} Value={newItem} Chr={50} />
                                        </div>
                                        <TextEn Title="Qty" Id="newQty" Change={e => setNewQty(e.target.value)} Value={newQty} Chr={50} />
                                        <TextEn Title="Unit" Id="newUnit" Change={e => setNewUnit(e.target.value)} Value={newUnit} Chr={50} />
                                        <TextEn Title="Rate" Id="newRate" Change={e => setNewRate(e.target.value)} Value={newRate} Chr={50} />
                                    </div>
                                    {items.length ? items.map(itm => (
                                        <div className="grid grid-cols-5" key={itm.id}>
                                            <p className="w-fit">{itm.name}</p>
                                            <p>{itm.rate}</p>
                                            <p>{itm.unit}</p>
                                            <p>{itm.qty}</p>
                                            <p>Delete</p>
                                        </div>
                                    )) : null}
                                </div>

                            </div>



                            <div className="w-full flex justify-start">
                                <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />

                            </div>

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

