"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/invoice/Add";
import Edit from "@/components/invoice/Edit";
import Delete from "@/components/invoice/Delete";
import Print from "@/components/invoice/Print";
const date_format = dt => new Date(dt).toISOString().split('T')[0];


const Invoice = () => {
    const [invoices, setInvoices] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                console.log(data);
                setInvoices(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setMsg("Failed to fetch data");
            }
        };
        fetchData();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    return (
        <>
            <div className="w-full my-6 lg:my-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Invoice</h1>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">Date</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Invoice No</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Shipment</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Customer</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Deduct</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Payment</th>
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end py-0.5 pr-4">
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.length ? (
                            invoices.map(invoice => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={invoice._id}>
                                    <td className="text-center py-2 px-4">{date_format(invoice.dt)}</td>
                                    <td className="text-center py-2 px-4">{invoice.invoiceno}</td>
                                    <td className="text-center py-2 px-4">{invoice.shipment}</td>
                                    <td className="text-center py-2 px-4">{invoice.customer.name}</td>
                                    <td className="text-center py-2 px-4">{invoice.deduct}</td>
                                    <td className="text-center py-2 px-4">{invoice.payment}</td>
                                    <td className="flex justify-end items-center space-x-1 mt-1 mr-2">
                                        <Delete message={messageHandler} id={invoice._id} data={invoices} />
                                        <Print message={messageHandler} id={invoice._id} data={invoices} />
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
        </>
    );

};

export default Invoice;


