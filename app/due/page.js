"use client";
import React, { useState, useEffect } from "react";
// import Details from "@/components/due/Details";
import { GetRemoteData } from "@/lib/utils/GetRemoteData";
import { numberWithComma } from "@/lib/NumberWithComma";
import { jsPDF } from "jspdf";
const date_format = dt => new Date(dt).toISOString().split('T')[0];
import { inword } from "@/lib/Inword";
require("@/lib/fonts/Poppins-Bold-normal");
require("@/lib/fonts/Poppins-Regular-normal");
import Add from "@/components/due/Add";




const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");



    useEffect(() => {
        const loadData = async () => {
            setWaitMsg('Please Wait...');
            try {

                const [customers, orders, deliveries, payments] = await Promise.all([
                    GetRemoteData('customer'),
                    GetRemoteData('order'),
                    GetRemoteData('delivery'),
                    GetRemoteData('payment')
                ]);


                const filteredCustomers = customers.filter(customer =>
                    deliveries.some(delivery => delivery.orderId.customerId === customer._id)
                );


                const customersWithDeliveries = filteredCustomers.map(customer => {
                    const matchingOrder = orders.filter(order => order.customerId._id === customer._id);
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
                        matchingOrder,
                        matchingDeliveries,
                        matchingPayments,
                        totalTaka,
                        totalPayment,
                        duesTaka: totalTaka - totalPayment
                    };
                });
                console.log(customersWithDeliveries)
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


    const printHandler = (id) => {
        console.log(customers, id)

        setWaitMsg('Please Wait...');
        setTimeout(() => {
            const customer = customers.find(customer => parseInt(customer._id) === parseInt(id));

            console.log(customer);

            const doc = new jsPDF({
                orientation: "p",
                unit: "mm",
                format: "a4",
                putOnlyUsedFonts: true,
                floatPrecision: 16
            });

            doc.setFont("Poppins-Regular", "normal");
            doc.setFontSize(10);
            doc.text(`${customer.name}`, 12, 20, null, null, "left");
            doc.text(`${customer.address}`, 12, 25, null, null, "left");
            doc.text(`${customer.contact}`, 12, 30, null, null, "left");
            doc.setFont("Poppins-Bold", "bold");
            doc.text("Purchage Order Information", 12, 37, null, null, "left");
            doc.text("Date", 25, 43, null, null, "center");
            doc.text("Order No", 91, 43, null, null, "center");
            doc.text("Amount", 196, 43, null, null, "right");
            doc.line(12, 39, 198, 39);
            doc.line(12, 45, 198, 45);
            doc.setFont("Poppins-Regular", "normal");
            doc.setFontSize(8);
            let y = 49;
            let gt = 0;
            const order = customer.matchingOrder;
            for (let i = 0; i < order.length; i++) {
                doc.text(`${date_format(order[i].dt)}`, 25, y, null, null, "center");
                doc.text(`${order[i].orderNo}`, 91, y, null, null, "center");
                const tk = order[i].items.reduce((t, c) => t + (parseFloat(c.qty) * parseFloat(c.taka)), 0);
                doc.text(`${numberWithComma(tk)}`, 196, y, null, null, "right");
                gt = gt + tk;
                y = y + 4;
            }
            doc.setFont("Poppins-Bold", "bold");
            doc.line(12, y - 3, 198, y - 3);
            doc.text('Total', 25, y - 0.5, null, null, "right");
            doc.text(`${numberWithComma(gt)}`, 196, y - 0.5, null, null, "right");
            // --------------------------------------------------------------------------------

            y = y + 8;
            doc.setFont("Poppins-Bold", "bold");
            doc.text("Delivery Information", 12, y + 2, null, null, "left");
            doc.text("Date", 25, y + 8, null, null, "center");
            doc.text("Order No", 70, y + 8, null, null, "center");
            doc.text("Invoice No", 120, y + 8, null, null, "center");
            doc.text("Amount", 196, y + 8, null, null, "right");
            doc.line(12, y + 4, 198, y + 4);
            doc.line(12, y + 10, 198, y + 10);
            doc.setFont("Poppins-Regular", "normal");
            doc.setFontSize(8);
            let z = y + 14;
            let dgt = 0;
            const delivery = customer.matchingDeliveries;
            for (let i = 0; i < delivery.length; i++) {
                doc.text(`${date_format(delivery[i].dt)}`, 25, z, null, null, "center");
                doc.text(`${delivery[i].invoiceNo}`, 70, z, null, null, "center");
                doc.text(`${delivery[i].invoiceNo}`, 120, z, null, null, "center");
                const tk = delivery[i].orderId.items.reduce((t, c) => t + (parseFloat(c.qty) * parseFloat(c.taka)), 0);
                doc.text(`${numberWithComma(tk)}`, 196, z, null, null, "right");
                dgt = dgt + tk;
                z = z + 4;
            }


            doc.setFont("Poppins-Bold", "bold");
            doc.line(12, z - 3, 198, z - 3);
            doc.text('Total', 25, z - 0.5, null, null, "right");
            doc.text(`${numberWithComma(dgt)}`, 196, z - 0.5, null, null, "right");

            //------------------------------------------------------------------------------------------------

            z = z + 8;
            doc.setFont("Poppins-Bold", "bold");
            doc.text("Payment Information", 12, z + 2, null, null, "left");
            doc.text("Date", 25, z + 8, null, null, "center");
            doc.text("Payment Type", 91, z + 8, null, null, "center");
            doc.text("Amount", 196, z + 8, null, null, "right");
            doc.line(12, z + 4, 198, z + 4);
            doc.line(12, z + 10, 198, z + 10);
            doc.setFont("Poppins-Regular", "normal");
            doc.setFontSize(8);

            let n = z + 14;
            let pgt = 0;
            const payment = customer.matchingPayments;
            for (let i = 0; i < payment.length; i++) {
                doc.text(`${date_format(payment[i].dt)}`, 25, n, null, null, "center");
                doc.text(`${payment[i].cashtypeId.name}`, 91, n, null, null, "center");
                doc.text(`${payment[i].taka}`, 196, n, null, null, "center");

                pgt = pgt + parseFloat(payment[i].taka);
                n = n + 4;
            }


            doc.setFont("Poppins-Bold", "bold");
            doc.line(12, n - 3, 198, n - 3);
            doc.text('Total', 25, n - 0.5, null, null, "right");
            doc.text(`${numberWithComma(pgt)}`, 196, n - 0.5, null, null, "right");


            //------------------------------------------------------------------------------------------------

            let p = n + 8;
            doc.text(`Balance: (${numberWithComma(dgt)} - ${numberWithComma(pgt)}) = ${numberWithComma(dgt-pgt)}/-`, 12, p + 2, null, null, "left");

            doc.save(`Customer_Details_Created_${date_format(new Date())}.pdf`);
            setWaitMsg('');
        }, 0);




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
                            <th>

                            </th>
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
                                    <td className="text-center py-2 px-4">{numberWithComma(parseFloat(customer.duesTaka))}/-</td>
                                    <td className="text-end py-2 px-4">
                                        <div className="flex justify-end space-x-3">
                                            <Add message={messageHandler} id={customer._id} />
                                         
                                            <button onClick={() => printHandler(customer._id)} title="Reports" className="w-7 h-7 flex justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
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


