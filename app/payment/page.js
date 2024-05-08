"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/payment/Add";
import Edit from "@/components/payment/Edit";
import Delete from "@/components/payment/Delete";
import { numberWithComma } from "@/lib/NumberWithComma";
const date_format = dt => new Date(dt).toISOString().split('T')[0];



const Payment = () => {
    const [payments, setPayments] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");

    const [dt1, setDt1] = useState("");
    const [dt2, setDt2] = useState("");
    const [newPayments, setNewPayments] = useState([]);
    const [totalPayment, setTotalPayment] = useState('0');


    useEffect(() => {
        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
               // console.log(data);
                setPayments(data);
                setWaitMsg('');

                //---------------------------------------------------
                setNewPayments(data)
                const total = data.reduce((t, c) => t + parseFloat(c.taka), 0);
                setTotalPayment(total);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
        setDt1('2024-05-01');
        setDt2(date_format(new Date()));
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }



    const searchClickHandler = () => {
        const d1 = new Date(dt1);
        const d2 = new Date(dt2);

      //  console.log("dfsdf", newPayments);
        const searchPayment = newPayments.filter(payment => {
            const dataDate = new Date(payment.dt);
            return dataDate >= d1 && dataDate <= d2;
        })
       // console.log(searchPayment);
        setPayments(searchPayment);
        const total = searchPayment.reduce((t, c) => t + parseFloat(c.taka) , 0);
        setTotalPayment(total);
    }

    const refreshClickHandler = () => {
        setPayments(newPayments);
        const total = newPayments.reduce((t, c) => t + parseFloat(c.taka) , 0);
        setTotalPayment(total);
    }



    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Payment</h1>
                <h1 className="w-full text-xl lg:text-2xl font-bold text-center text-gray-400">Total = {numberWithComma(parseFloat(totalPayment))}/-</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <div className="p-2 overflow-auto">
                    <div className="flex justify-end items-center space-x-2 mb-2">
                        <input onChange={e => setDt1(e.target.value)} value={dt1} type="date" id='dt1' name="dt1" required className="w-[155px] px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
                        <span>To</span>
                        <input onChange={e => setDt2(e.target.value)} value={dt2} type="date" id='dt2' name="dt2" required className="w-[155px] px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
                        <button onClick={searchClickHandler} className="text-center mx-0.5 px-4 py-2 bg-green-600 hover:bg-green-800 text-white font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300  cursor-pointer">Search</button>
                        <button onClick={refreshClickHandler} className="text-center mx-0.5 px-4 py-2 bg-violet-600 hover:bg-violet-800 text-white font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300  cursor-pointer">Refresh</button>

                    </div>
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">Date</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Customer</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Cash Type</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length ? (
                                payments.map(payment => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={payment._id}>
                                        <td className="text-center py-2 px-4">{date_format(payment.dt)}</td>
                                        <td className="text-center py-2 px-4">{payment.customerId.name}</td>
                                        <td className="text-center py-2 px-4">{payment.cashtypeId.name}</td>
                                        <td className="text-center py-2 px-4">{payment.taka}</td>
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={payment._id} data={payments} />
                                            <Delete message={messageHandler} id={payment._id} data={payments} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center py-10 px-4">
                                        Data not available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

};

export default Payment;


