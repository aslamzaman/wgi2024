import React, { useEffect, useState } from "react";
import { BtnSubmit, TextDt, TextBnDisabled, DropdownEn, TextNum } from "@/components/Form";
import { addItem, getItems } from "@/lib/utils/LocalDatabase";
const date_format = dt => new Date(dt).toISOString().split('T')[0];


const Delivery = ({ message, id, data }) => {
    const [dt, setDt] = useState('');
    const [orderno, setOrderno] = useState('');
    const [customerId, setCustomerid] = useState('');
    const [itemId, setItemid] = useState('');
    const [unitId, setUnitid] = useState('');
    const [qty, setQty] = useState('');
    const [taka, setTaka] = useState('');
    const [delivery, setDelivery] = useState('');
    const [show, setShow] = useState(false);



    const [customerName, setCustomerName] = useState('');
    const [itemName, setItemNamn] = useState('');
    const [unitName, setUnitName] = useState('');

    const [locals, setLocals] = useState([]);



    const showDeiveryForm = async () => {
        setShow(true);
        message("Ready to edit");
        try {

            //-----------------------------------------------------------------
            console.log(data)
            const { dt, orderno, customerId, itemId, unitId, qty, taka, delivery } = data.find(order => order._id === id) || { dt: '', orderno: '', customerId: '', itemId: '', unitId: '', qty: '', taka: '', delivery: '' };
            setDt(date_format(dt));
            setOrderno(orderno);
            setCustomerid(customerId._id);
            setItemid(itemId._id);
            setUnitid(unitId._id);
            setQty(qty);
            setTaka(taka);
            setDelivery(delivery);

            //---------------------------------------
            setCustomerName(customerId.name);
            setItemNamn(itemId.name);
            setUnitName(unitId.name);


            //-----------------------------------
            if (delivery.length > 0) {
                localStorage.clear("order");
                for (let i = 0; i < delivery.length; i++) {
                    addItem("order", delivery[i]);
                }
            }
            console.log(delivery.length);
            const dd = getItems("order");
            console.log(dd.data);
            setLocals(dd.data);

        } catch (err) {
            console.log(err);
        }
    };


    const closeEditForm = () => {
        setShow(false);
        message("Data ready.");
    };


    const createObject = () => {
        return {
            dt: dt,
            orderno: orderno,
            customerId: customerId,
            itemId: itemId,
            unitId: unitId,
            qty: qty,
            taka: taka,
            delivery: delivery
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${id}`;
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message("Updated successfully completed");
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


    const addClickHandler = () => {
        const bayprostabObject = {
            id: Date.now(),
            dt: '2024-10-20',
            qty: 60
        };


        addItem("order", bayprostabObject);
        console.log('addClicked');
        const data = getItems('order');
        locals.push(data)
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Delivery Existing Data</h1>
                            <button onClick={closeEditForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>

                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler} >
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <p>
                                        Order Date: {dt} ; Order No: <span className="font-bold"> {orderno}</span> <br />
                                        Customer : {customerName} <br />
                                        Item : {itemName}; Unit: {unitName} <br />
                                        Quantity : {qty}; Taka: {taka}
                                    </p>

                                    <div className="grid grid-cols-5 gap-4">

                                        <div className="col-span-4 flex space-x-4">
                                            <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                            <TextNum Title="Quantity" Id="qty" Change={e => setQty(e.target.value)} Value={qty} />
                                        </div>


                                        <svg onClick={addClickHandler} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 mt-5 stroke-black hover:stroke-gray-400 cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>


                                    </div>



                                    <table className="w-full border border-gray-200">
                                        <thead>
                                            <tr className="w-full bg-gray-200">
                                                <th className="text-center border-b border-gray-200 py-2">Dt</th>
                                                <th className="text-center border-b border-gray-200 py-2">Qty</th>
                                                <th className="font-normal text-start flex justify-end mt-1">
                                                   
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                locals.length ? locals.map((local) => {
                                                    return (
                                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={local.id}>
                                                            <td className="text-center py-2 px-4">{local.dt}</td>
                                                            <td className="text-center py-2 px-4">{local.qty}</td>
                                                            <td className="flex justify-end items-center mt-1">

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                    : null
                                            }
                                        </tbody>
                                    </table>





                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>


                    </div >
                </div >
            )}
            <button onClick={showDeiveryForm} title="Delivery" className="px-1 py-1 hover:bg-teal-300 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-black hover:stroke-blue-800 transition duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </button>
        </>
    )
}
export default Delivery;


