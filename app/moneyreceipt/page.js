"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/moneyreceipt/Add";
import Edit from "@/components/moneyreceipt/Edit";    
import Delete from "@/components/moneyreceipt/Delete";


const Moneyreceipt = () => {
    const [moneyreceipts, setMoneyreceipts] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/moneyreceipt`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                console.log(data);
                setMoneyreceipts(data);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Moneyreceipt</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>  
                <div className="p-2 overflow-auto">  
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">                           
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Dt</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Receiveno</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Receivedfrom</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Cashtype</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Bankname</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Chequeno</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Chequedt</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Purpose</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Contact</th>                                
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {moneyreceipts.length ?(
                                moneyreceipts.map(moneyreceipt => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={moneyreceipt._id}>                                           
                                          <td className="text-center py-2 px-4">{moneyreceipt.dt}</td>
                                          <td className="text-center py-2 px-4">{moneyreceipt.receiveNo}</td>
                                          <td className="text-center py-2 px-4">{moneyreceipt.receivedFrom}</td>
                                          <td className="text-center py-2 px-4">{moneyreceipt.taka}</td>
                                          <td className="text-center py-2 px-4">{moneyreceipt.cashType}</td>
                                          <td className="text-center py-2 px-4">{moneyreceipt.bankName}</td>
                                          <td className="text-center py-2 px-4">{moneyreceipt.chequeNo}</td>
                                          <td className="text-center py-2 px-4">{moneyreceipt.chequeDt}</td>
                                          <td className="text-center py-2 px-4">{moneyreceipt.purpose}</td>
                                          <td className="text-center py-2 px-4">{moneyreceipt.contact}</td>                                            
                                        <td className="flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={moneyreceipt._id} data={moneyreceipts} />
                                            <Delete message={messageHandler} id={moneyreceipt._id} data={moneyreceipts} />
                                        </td>
                                    </tr>
                                ))
                            ): (
                                <tr>
                                    <td colSpan={11} className="text-center py-10 px-4">
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

export default Moneyreceipt;


