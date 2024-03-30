"use client";
import React, { useState, useEffect } from "react";
// import Details from "@/components/due/Details";
import { fetchData } from "@/lib/utils/FetchData";


const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const loadData = async () => {
            try {

                const [responseCustomer, responseDelivery, responsePayment] = await Promise.all([
                    fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer`),
                    fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery`),
                    fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`)
                ]);

                const ss = { c: responseCustomer, d: responseDelivery, p: responsePayment }
                console.log(ss);

                const resultCustomer = responseCustomer.map(customer => {
                    const matchDelivery = responseDelivery.filter(delivery => delivery.customer._id === customer._id);
                    const deliverItems = matchDelivery.map(delivery => delivery.items);
                    const flattenedArray = deliverItems.flat();
                    //  console.log("dfdsfdsf" ,flattenedArray);

                    // Calculate the total qty multiplied by taka using reduce
                    const totalPrice = flattenedArray.reduce((total, current) => total + (current.qty * current.taka), 0);

                    const deliverDeduct = matchDelivery.reduce((t, c) => t + c.deduct, 0);
                    const deliverPayment = matchDelivery.reduce((t, c) => t + c.payment, 0);


                    const matchPayment = responsePayment.filter(payment => payment.customer._id === customer._id);
                    const paymentTaka = matchPayment.reduce((t, c) => t + c.taka, 0);
                    const dues = totalPrice - deliverDeduct - deliverPayment - paymentTaka;
                    return {
                        ...customer,
                        matchDelivery: matchDelivery,
                        matchPayment: matchPayment,
                        totalItemPrice: totalPrice,
                        deliverDeduct: deliverDeduct,
                        deliverPayment: deliverPayment,
                        paymentTaka: paymentTaka,
                        dues: dues

                    }
                })
                console.log(resultCustomer);
                const SortResult = resultCustomer.sort((a, b) => {
                    if (parseInt(a.totalItemPrice) < parseInt(b.totalItemPrice)) {
                      return 1;
                    } else {
                      return -1;
                    }
                  });

                setCustomers(SortResult);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Customer Dues</h1>
            </div>
            <div className="px-4 lg:px-6 overflow-auto">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-start border-b border-gray-200 px-4 py-2">Name</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Delivery</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Deduct</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Advance</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Payment</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Dues</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length ? (
                            customers.map(customer => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={customer._id}>
                                    <td className="text-start py-2 px-4">
                                        <span className="font-bold"> {customer.name}</span><br />
                                        {customer.address}<br />
                                        {customer.contact}
                                    </td>
                                    <td className="text-center py-2 px-4">{customer.totalItemPrice}</td>
                                    <td className="text-center py-2 px-4">{customer.deliverDeduct}</td>
                                    <td className="text-center py-2 px-4">{customer.deliverPayment}</td>
                                    <td className="text-center py-2 px-4">{customer.paymentTaka}</td>
                                    <td className="text-center py-2 px-4">{customer.dues}</td>
                                   
                                </tr>
                            ))
                        ) : (
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


