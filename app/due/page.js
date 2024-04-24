"use client";
import React, { useState, useEffect } from "react";
// import Details from "@/components/due/Details";
import { GetRemoteData } from "@/lib/utils/GetRemoteData";


const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");



    useEffect(() => {
        const loadData = async () => {
            setWaitMsg('Please Wait...');
            try {

                const [customers, deliveries, payments] = await Promise.all([
                    GetRemoteData('customer'),
                    GetRemoteData('delivery'),
                    GetRemoteData('payment')
                ]);

                const filteredCustomers = customers.filter(customer =>
                    deliveries.some(delivery => delivery.orderId.customerId === customer._id)
                );


                const customersWithDeliveries = filteredCustomers.map(customer => {
                    const matchingDeliveries = deliveries.filter(delivery => delivery.orderId.customerId === customer._id);
                    const matchingPayments = payments.filter(payment => payment.customerId._id === customer._id);

                    const totalPayment = matchingPayments.reduce((t, c) => (t + parseFloat(c.taka)), 0);


                    const resultDelivery = matchingDeliveries.map(delivery => {
                        const invoiceNO = delivery.invoiceNo;
                        const deductTaka = delivery.deduct;
                        const advanceTaka = delivery.advance;
                        const orderTaka = delivery.orderId.items.reduce((t, c) => (t + parseFloat(c.qty) * parseFloat(c.taka)), 0);
                        return {
                            invoiceNO, deductTaka, advanceTaka, orderTaka
                        }

                    })
                    const totalTaka = resultDelivery.reduce((t, c) => (t + parseFloat(c.orderTaka) - parseFloat(c.deductTaka) - parseFloat(c.advanceTaka)), 0);

                    return {
                        ...customer,
                        resultDelivery,
                        totalTaka,
                        totalPayment,
                        duesTaka: totalTaka - totalPayment
                    };
                });

                setCustomers(customersWithDeliveries);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Customer Dues</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <div className="px-4 lg:px-6 overflow-auto">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-start border-b border-gray-200 px-4 py-2">Name</th>
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
                                    <td className="text-center py-2 px-4">{customer.duesTaka}</td>

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


