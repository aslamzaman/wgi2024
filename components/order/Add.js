import React, { useEffect, useState } from "react";
import { BtnSubmit, TextDt, TextEnDisabled, DropdownEn } from "@/components/Form";
const date_format = dt => new Date(dt).toISOString().split('T')[0];
import { fetchData } from "@/lib/utils/FetchData";
import AddLocal from "./AddLocal";
import DeleteLocal from "./DeleteLocal";
import { getItems } from "@/lib/utils/LocalDatabase";


const Add = ({ message }) => {
    const [dt, setDt] = useState('');
    const [deliveryDt, setDeliverydt] = useState('');
    const [orderNo, setOrderno] = useState('');
    const [customerId, setCustomerid] = useState('');
    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);

    const [customers, setCustomers] = useState([]);
    const [localitems, setLocalitems] = useState([]);
    const [msg, setMsg] = useState("Data ready");



    const resetVariables = () => {
        message("Ready to make new additions");
        setDt(date_format(new Date()));
        setDeliverydt(date_format(new Date()));
        setOrderno(Math.round(Date.now() / 60000));
        setCustomerid('');
        setItems([]);
    }


    const showAddForm = async () => {
        setShow(true);
        resetVariables();
        let data = getItems("localitem");
        console.log("Aslam", data)
        setLocalitems(data.data);



        try {
            const response = await fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer`);
            console.log(response);
            const SortResult = response.sort((a, b) => {
                if ((a.name).toUpperCase() < (b.name).toUpperCase()) {
                  return -1;
                } else {
                  return 1;
                }
              });
            setCustomers(SortResult);

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
        let localData = getItems("localitem");
        return {
            dt: dt,
            deliveryDt: deliveryDt,
            orderNo: orderNo,
            customerId: customerId,
            items: localData.data
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        let localData = getItems("localitem");
        if(localData.data.length < 1){
            message("No item added!");
            setShow(false);
            return false; 
        } 
            
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

    //--------------------------------------------------



    const msgHandler = (data) => {
        setMsg(data);
        let localData = getItems("localitem");
        setLocalitems(localData.data);
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
                        <div className="px-6 pb-6 text-black overflow-auto">

                            <h1 className="py-4font-bold text-lg text-start">Add Items</h1>

                            <table className="w-full border border-gray-200">
                                <thead>
                                    <tr className="w-full bg-gray-200">
                                        <th className="text-center border-b border-gray-200 py-2">Name</th>
                                        <th className="text-center border-b border-gray-200 py-2">Description</th>
                                        <th className="text-center border-b border-gray-200 py-2">Quantity</th>
                                        <th className="text-center border-b border-gray-200 py-2">Unit</th>
                                        <th className="text-center border-b border-gray-200 py-2">Taka</th>
                                        <th className="font-normal flex justify-end mt-1">
                                            <AddLocal Msg={msgHandler} />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        localitems.length ? localitems.map((localitem) => {
                                            return (
                                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={localitem.id}>
                                                    <td className="text-center py-2 px-4">{localitem.name}</td>
                                                    <td className="text-center py-2 px-4">{localitem.description}</td>
                                                    <td className="text-center py-2 px-4">{localitem.qty}</td>
                                                    <td className="text-center py-2 px-4">{localitem.unit}</td>
                                                    <td className="text-center py-2 px-4">{localitem.taka}</td>
                                                    <td className="flex justify-end items-center mt-1">
                                                        <DeleteLocal Msg={msgHandler} Id={localitem.id} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                            : null
                                    }
                                </tbody>
                            </table>




                            <div className="bg-black h-[2px] my-6"></div>

                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-2 gap-4 my-4">
                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <TextDt Title="Delivery Date" Id="deliveryDt" Change={e => setDeliverydt(e.target.value)} Value={deliveryDt} />
                                    <TextEnDisabled Title="Order No (Auto)" Id="orderNo" Change={e => setOrderno(e.target.value)} Value={orderNo} Chr={50} />
                                    <DropdownEn Title="Customer" Id="customerId" Change={e => setCustomerid(e.target.value)} Value={customerId}>
                                        {customers.length ? customers.map(customer => <option value={customer._id} key={customer._id}>{customer.name}</option>) : null}
                                    </DropdownEn>

                                    {/* <TextEn Title="Items" Id="items" Change={e => setItems(e.target.value)} Value={items} Chr={50} /> */}
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

