"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/order/Add";
import Edit from "@/components/order/Edit";    
import Delete from "@/components/order/Delete";
import Delivery from "@/components/order/Delivery";
const date_format = dt => new Date(dt).toISOString().split('T')[0];


const Order = () => {
    const [orders, setOrders] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                console.log(data);
                setOrders(data);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Order</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>    
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">                           
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Date</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Order No</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Customer</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Item</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Unit</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Quantity</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Delivery</th>                                
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end py-0.5 pr-4">
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length ?(
                            orders.map(order => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={order._id}>                                           
                                          <td className="text-center py-2 px-4">{date_format(order.dt)}</td>
                                          <td className="text-center py-2 px-4">{order.orderno}</td>
                                          <td className="text-center py-2 px-4">{order.customerId.name}</td>
                                          <td className="text-center py-2 px-4">{order.itemId.name}</td>
                                          <td className="text-center py-2 px-4">{order.unitId.name}</td>
                                          <td className="text-center py-2 px-4">{order.qty}</td>
                                          <td className="text-center py-2 px-4">{order.taka}</td>
                                          <td className="text-center py-2 px-4">{order.delivery}</td>                                            
                                    <td className="flex justify-end items-center space-x-1 mt-1">
                                        <Edit message={messageHandler} id={order._id} data={orders} />
                                        <Delete message={messageHandler} id={order._id} data={orders} />
                                        <Delivery message={messageHandler} id={order._id} data={orders} />
                                    </td>
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan={9} className="text-center py-10 px-4">
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

export default Order;


