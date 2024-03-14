import React, { useState } from "react";
import { BtnSubmit, DropdownEn, TextDt, TextNum, TextEnDisabled } from "@/components/Form";
import { fetchData } from "@/lib/utils/FetchData";
const date_format = (dt) => new Date(dt).toISOString().split('T')[0];


const Add = ({ message }) => {
    const [dt, setDt] = useState('');
    const [orderno, setOrderno] = useState('');
    const [customerid, setCustomerid] = useState('');
    const [itemid, setItemid] = useState('');
    const [unitid, setUnitid] = useState('');
    const [qty, setQty] = useState('');
    const [taka, setTaka] = useState('');
    const [show, setShow] = useState(false);


    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);
    const [unittypes, setUnittypes] = useState([]);

    const resetVariables = () => {
        message("Ready to make new additions");
        setDt(date_format(new Date()));
        setOrderno(Math.round(Date.now() / 1000));
        setCustomerid('');
        setItemid('');
        setUnitid('');
        setQty('');
        setTaka('');
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
            orderno: orderno,
            customerid: customerid,
            itemid: itemid,
            unitid: unitid,
            qty: qty,
            taka: taka
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message("Order is created!");
            } else {
                throw new Error("Failed to create order");
            }
        } catch (error) {
            console.error("Error saving order data:", error);
            message("Error saving order data.");
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
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
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
                                    <TextEnDisabled Title="Order No(Auto generated)" Id="orderno" Change={e => setOrderno(e.target.value)} Value={orderno} Chr="50" />

                                    <DropdownEn Title="Customer" Id="customerid" Change={e => setCustomerid(e.target.value)} Value={customerid} >
                                        {customers.map(customer => <option value={customer._id} key={customer._id}>{customer.name}</option>)}
                                    </DropdownEn>

                                    <DropdownEn Title="Item" Id="itemid" Change={e => setItemid(e.target.value)} Value={itemid} >
                                        {items.map(item => <option value={item._id} key={item._id}>{item.name}</option>)}
                                    </DropdownEn>

                                    <DropdownEn Title="Unit" Id="unitid" Change={e => setUnitid(e.target.value)} Value={unitid} >
                                        {unittypes.map(unittype => <option value={unittype._id} key={unittype._id}>{unittype.name}</option>)}
                                    </DropdownEn>


                                    <TextNum Title="Quantity" Id="qty" Change={e => setQty(e.target.value)} Value={qty} />
                                    <TextNum Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
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

