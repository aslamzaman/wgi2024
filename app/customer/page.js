"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/customer/Add";
import Edit from "@/components/customer/Edit";    
import Delete from "@/components/customer/Delete";


const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                console.log(data);
                setCustomers(data);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Customer</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>  
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">                           
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Address</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Contact</th>                                
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end py-0.5 pr-4">
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length ?(
                            customers.map(customer => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={customer._id}>                                           
                                          <td className="text-center py-2 px-4">{customer.name}</td>
                                          <td className="text-center py-2 px-4">{customer.address}</td>
                                          <td className="text-center py-2 px-4">{customer.contact}</td>                                            
                                    <td className="flex justify-end items-center space-x-2 mt-1">
                                        <Edit message={messageHandler} id={customer._id} data={customers} />
                                        <Delete message={messageHandler} id={customer._id} data={customers} />
                                    </td>
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan={4} className="text-center py-10 px-4">
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

export default Customer;


