"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/order/Add";
import Edit from "@/components/order/Edit";    
import Delete from "@/components/order/Delete";
import { fetchData } from "@/lib/utils/FetchData";
const date_format = dt => new Date(dt).toISOString().split('T')[0];


const Order = () => {
    const [orders, setOrders] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const loadData = async () => {
            try {
                const [responseOrder, responseDelivery] = await Promise.all([
                    fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order`),
                    fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery`)
                ]);
              //  console.log(responseOrder, responseDelivery);


                const result= responseOrder.map(order=>{
                    const matchDelivery = responseDelivery.filter(delivery=>delivery.orderId._id === order._id);
                    const sumDeliveryQty = matchDelivery.reduce((t,c)=> t + c.qty,0);
                    return{
                        ...order,
                        deliveryQty: sumDeliveryQty
                    }
                });
            
               // console.log(result);
                setOrders(result);
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
            <div className="w-full my-6 lg:my-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Order</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>   
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">                           
                                  <th className="text-start border-b border-gray-200 px-4 py-2">Date</th>
                                  <th className="text-start border-b border-gray-200 px-4 py-2">Item</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Order [Delivery]</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                                  <th className="text-end border-b border-gray-200 px-4 py-2">Total</th>
                                                                 
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
                                <tr className={`${order.qty === order.deliveryQty || order.qty < order.deliveryQty?'bg-red-100':'bg-white'  } border-b border-gray-200 hover:bg-gray-100`} key={order._id}>                                           
                                          <td className="text-start py-2 px-4">
                                            Order No: <span className="font-bold">{order.orderno}</span> <br />
                                            Date: {date_format(order.dt)} <br />
                                            Customer: {order.customerId.name} 
                                            </td>
                                          <td className="text-start py-2 px-4">{order.itemId.name}-{order.unitId.name}</td>
                                          <td className="text-center py-2 px-4">{order.qty} [{order.deliveryQty}]</td>
                             
                                          <td className="text-center py-2 px-4">{order.taka}</td>
                                          <td className="text-end py-2 px-4">{(order.taka * order.qty).toLocaleString('en-IN')}</td>
                                    <td className="h-24 flex justify-end items-center space-x-1 mt-1 mr-2">
                                        <Edit message={messageHandler} id={order._id} data={orders} />
                                        <Delete message={messageHandler} id={order._id} data={orders} />
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


