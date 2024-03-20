import React, { useEffect, useState } from "react";
import { TextEn, BtnSubmit, BtnSubmitSm, TextDt, TextEnDisabled, DropdownEn } from "@/components/Form";
import { addItem, getItems, deleteItem } from "@/lib/utils/LocalDatabase";
import { Close } from "../Icons";
import { fetchData } from "@/lib/utils/FetchData";
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

    //--------------------------------------------------
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);
    const [unittypes, setUnittypes] = useState([]);

    const [locals, setLocals] = useState([]);

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


    const showAddForm = async () => {
        setShow(true);
        resetVariables();

        try {
            const [responseCustomer, responseItem, responseUnittype] = await Promise.all([
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/item`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unittype`)
            ]);
console.log(responseCustomer, responseItem, responseUnittype)
            setCustomers(responseCustomer);
            setItems(responseItem);
            setUnittypes(responseUnittype);
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

    //------------------------------------------------------------------
    useEffect(() => {
        const getLocalData = () => {
            try {
                const response = getItems('invoice');
                setLocals(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getLocalData();
    }, [msg]);


    const itemAddHandler = (e) => {
        e.preventDefault();
        try {
            const id = Date.now();
            let obj = {
                id: id,
                name: newItem,
                rate: newRate,
                unit: newUnit,
                qty: newQty
            }

            const response = addItem("invoice", obj);
            setMsg("Added Id: " + id);
        } catch (error) {
            console.log(error);
            setMsg("Error saving post data.");
        }
    }

    const deleteHookHandler = (id) => {
        try {
            const response = deleteItem("invoice", id);
            setMsg("Deleted Id: " + id);
        } catch (error) {
            console.log(error);
            setMsg("Data deleting error");
        }
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
                                    <p className="w-full text-start text-xs text-blue-400 mt-1">{msg}</p>
                                    <form onSubmit={itemAddHandler}>
                                        <div className="grid grid-cols-6 gap-4 mb-4">
                                            <div className="col-span-2">
                                                <DropdownEn Title="Item" Id="newItem" Change={e => setNewItem(e.target.value)} Value={newItem}>
                                                    {items.length ? items.map(item => <option value={item.name} key={item._id}>{item.name}</option>) : null}
                                                </DropdownEn>
                                            </div>
                                            <TextEn Title="Qty" Id="newQty" Change={e => setNewQty(e.target.value)} Value={newQty} Chr={50} />
                                            <DropdownEn Title="Unit" Id="newUnit" Change={e => setNewUnit(e.target.value)} Value={newUnit}>
                                                {unittypes.length ? unittypes.map(unittype => <option value={unittype.name} key={unittype._id}>{unittype.name}</option>) : null}
                                            </DropdownEn>

                                            <TextEn Title="Rate" Id="newRate" Change={e => setNewRate(e.target.value)} Value={newRate} Chr={50} />
                                            <BtnSubmitSm Title="Save" Class="h-8 mt-5 bg-blue-600 hover:bg-blue-800 text-white" />
                                        </div>
                                    </form>

                                    <table className="w-full border border-gray-200 mt-10">
                                        <thead>
                                            <tr className="w-full bg-gray-200">
                                                <th className="text-start border-b border-gray-200 px-4 py-2">Item</th>
                                                <th className="text-center border-b border-gray-200 px-4 py-2">Rate</th>
                                                <th className="text-center border-b border-gray-200 px-4 py-2">Unit</th>
                                                <th className="text-center border-b border-gray-200 px-4 py-2">Qty</th>
                                                <th className="w-[80px] text-end border-b border-gray-200 px-4 py-2">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {locals.length ? (
                                                locals.map(itm => (
                                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={itm.id}>
                                                        <td className="text-start py-2 px-4 line-clamp-4">{itm.name}</td>
                                                        <td className="text-center py-2 px-4">{itm.rate}</td>
                                                        <td className="text-center py-2 px-4 line-clamp-2">{itm.unit}</td>
                                                        <td className="text-center py-2 px-4">{itm.qty}</td>

                                                        <td className="flex justify-end items-center space-x-1 mt-1 mr-2">
                                                            <Close Click={() => deleteHookHandler(itm.id)} Size="w-6 h-6" />
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="text-center py-10 px-4">
                                                        Data not available.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>



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

