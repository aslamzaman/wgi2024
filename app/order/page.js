"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/order/Add";
import Delete from "@/components/order/Delete";
const date_format = dt => new Date(dt).toISOString().split('T')[0];
import { GetRemoteData } from "@/lib/utils/GetRemoteData";



const Order = () => {
    const [orders, setOrders] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");


    useEffect(() => {
        const loadData = async () => {
            setWaitMsg('Please Wait...');
            try {

                const [responseOrder, responseDelivery] = await Promise.all([
                    GetRemoteData('order'),
                    GetRemoteData('delivery')
                ]);

                //-----------------------------
                const filterOrder = responseOrder
                    .filter(order => order.customerId.isDeleted === false)
                    .map(order => {
                        const matchDelivery = responseDelivery.find(delivery => delivery.orderNo === order.orderNo);
                        return {
                            ...order,
                            delivery: matchDelivery ? true : false
                        }
                    })

                console.log(filterOrder)
                setOrders(filterOrder);
                setWaitMsg('');
            } catch (error) {
                console.error("Error fetching data:", error);
                setMsg("Failed to fetch data");
            }
        };
        loadData();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Order</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <div className="p-2 overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">Date</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Delivery Date</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Order No</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Customer</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length ? (
                                orders.map(order => {
                                    let tTaka = order.items.reduce((t, c) => t + (c.qty * c.taka), 0);
                                    return (
                                        <tr className={`border-b border-gray-200 hover:bg-gray-100 ${order.delivery === true ? 'line-through text-red-400' : 'no-underline text-black'}`} key={order._id}>
                                            <td className="text-center py-2 px-4">{date_format(order.dt)}</td>
                                            <td className="text-center py-2 px-4">{date_format(order.deliveryDt)}</td>
                                            <td className="text-center py-2 px-4">{order.orderNo}</td>
                                            <td className="text-center py-2 px-4">{order.customerId.name}</td>
                                            <td className="text-center py-2 px-4">{tTaka}</td>
                                            <td className="flex justify-end items-center space-x-1 mt-1 mr-2">
                                                {order.delivery === false ? <Delete message={messageHandler} id={order._id} data={orders} /> : null}
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 px-4">
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

export default Order;


