"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/delivery/Add";
import Delete from "@/components/delivery/Delete";
import jsPDF from "jspdf";
import { inword } from "@/lib/Inword";
const date_format = dt => new Date(dt).toISOString().split('T')[0];
require("@/lib/fonts/Poppins-Bold-normal");
require("@/lib/fonts/Poppins-Regular-normal");

const Delivery = () => {
    const [deliverys, setDeliverys] = useState([]);
    const [searchText, setSearchText] = useState('28528433');
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");


    const fetchData = async () => {
        setWaitMsg('Please Wait...');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            console.log(data);
            setDeliverys(data);
            setWaitMsg('');
        } catch (error) {
            console.error("Error fetching data:", error);
            setMsg("Failed to fetch data");
        }
    };



    useEffect(() => {
        fetchData();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    const printHandler = (id) => {
        setWaitMsg('Please Wait...');
        setTimeout(() => {
            const invoice = deliverys.find(delivery => delivery._id === id);
            // console.log(invoice);

            const doc = new jsPDF({
                orientation: "p",
                unit: "mm",
                format: "a4",
                putOnlyUsedFonts: true,
                floatPrecision: 16
            });


            doc.setFont("Poppins-Bold", "bold");
            doc.setFontSize(16);

            doc.text(`BILL/INVOICE`, 105, 55, null, null, "center");
            doc.setFont("Poppins-Regular", "normal");
            doc.setFontSize(10);
            doc.text(`Order No: ${invoice.orderNo}`, 105, 61, null, null, "center");
            doc.text(`Order Date: ${date_format(invoice.orderDt)}`, 105, 66, null, null, "center");

            doc.setFont("Poppins-Regular", "normal");
            doc.setFontSize(10);
            doc.text(`Invoice No: ${invoice.invoiceNo}`, 190, 70, null, null, "right");
            doc.text(`Shipment No: ${invoice.shipment}`, 190, 75, null, null, "right");
            doc.text(`Invoice Date: ${date_format(invoice.dt)}`, 190, 80, null, null, "right");

            doc.setFont("Poppins-Bold", "bold");
            doc.text(`${invoice.customer.name}`, 20, 85, null, null, "left");
            doc.setFont("Poppins-Regular", "normal");
            doc.text(`${invoice.customer.address}`, 20, 90, null, null, "left");
            doc.text(`${invoice.customer.contact}`, 20, 95, null, null, "left");
            doc.setFontSize(7);
            doc.text(`Print Data: ${date_format(invoice.orderDt)}`, 190, 98, null, null, "right");
            doc.setFontSize(10);

            doc.line(20, 99.5, 190, 99.5);
            doc.line(20, 107, 190, 107);
            doc.setFont("Poppins-Bold", "bold");
            doc.text("Description", 23, 104, null, null, "left");
            doc.text("Quantity", 105, 104, null, null, "center");
            doc.text("Unit", 128, 104, null, null, "center");
            doc.text("Rate", 158, 104, null, null, "right");
            doc.text("Total", 187, 104, null, null, "right");
            doc.setFont("Poppins-Regular", "normal");
            let y = 112;
            let subTotal = 0;
            let items = invoice.items;
            for (let i = 0; i < items.length; i++) {
                const total = items[i].qty * items[i].taka;
                subTotal = subTotal + total;
                doc.text(`${items[i].name}`, 23, y, null, null, "left");
                doc.text(`${items[i].description}`, 23, y + 5, null, null, "left");
                doc.text(`${items[i].qty}`, 105, y, null, null, "center");
                doc.text(`${items[i].unit}`, 128, y, null, null, "center");
                doc.text(`${items[i].taka.toLocaleString("en-IN")}`, 158, y, null, null, "right");
                doc.text(`${total.toLocaleString("en-IN")}`, 187, y, null, null, "right");
                y = y + 12;
            }

            doc.line(20, y - 5, 190, y - 5); // Horizontal line
            // Subtotal 
            doc.text("Subtotal", 23, y - 1, null, null, "left");
            doc.text(`${subTotal.toLocaleString("en-IN")}`, 187, y - 1, null, null, "right");

            // Deduct
            doc.text("Deduct", 23, y + 5, null, null, "left");
            doc.text(`${parseInt(invoice.deduct).toLocaleString("en-IN")}`, 187, y + 5, null, null, "right");

            // Advance
            doc.text("Advance", 23, y + 11, null, null, "left");
            doc.text(`${parseInt(invoice.payment).toLocaleString("en-IN")}`, 187, y + 11, null, null, "right");


            // Amount to be pay
            doc.setFont("Poppins-Bold", "bold");
            doc.text("Amount to pay", 23, y + 17, null, null, "left");
            const gt = subTotal - (parseInt(invoice.deduct) + parseInt(invoice.payment));
            doc.text(`${gt.toLocaleString("en-IN")}`, 187, y + 17, null, null, "right");

            doc.line(20, y + 19, 190, y + 19); // Horizontal line

            doc.setFont("Poppins-Regular", "normal");
            doc.text(`INWORD: ${inword(gt).toUpperCase()}ONLY.`, 20, y + 24, null, null, "left");

            doc.line(20, 99.5, 20, y + 19); // Vertical Line
            doc.line(94, 99.5, 94, y + 19); // Vertical Line
            doc.line(117, 99.5, 117, y + 19); // Vertical Line
            doc.line(140, 99.5, 140, y + 19); // Vertical Line
            doc.line(160, 99.5, 160, y + 19); // Vertical Line
            doc.line(190, 99.5, 190, y + 19); // Vertical Line

            doc.setFontSize(10);
            doc.text("Thank you for your kind cooperation.", 20, y + 40, null, null, "left");

            doc.save(`Invoice_${invoice.invoiceno}_Created_${date_format(new Date())}.pdf`);
            setWaitMsg('');
        }, 0);

    }

    const searchClickHandler = () => {
        const filterResult = deliverys.filter(invoice => invoice.invoiceNo === parseInt(searchText));
        console.log(filterResult)
        setDeliverys(filterResult);
    }

    const refreshClickHandler = async () => {
        await fetchData();
        setMsg("Data ready");
    }

    return (
        <>
            <div className="w-full my-6 lg:my-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Delivery & Invoice</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <div className="px-4 lg:px-6">
                <div className="p-2 overflow-auto">

                    <div className="flex justify-between items-center p-1 overflow-auto">
                        <p className="w-full text-sm text-red-700">{msg}</p>
                        <div className="flex justify-end">
                            <input type="text" onChange={(e) => setSearchText(e.target.value)} value={searchText} placeholder="Invoice No" className="w-full px-4 py-1 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
                            <button onClick={searchClickHandler} className="text-center mx-0.5 px-2 py-1 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-teal-800 hover:bg-teal-600 text-white cursor-pointer">Search</button>
                            <button onClick={refreshClickHandler} className="text-center mx-0.5 px-2 py-1 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-green-800 hover:bg-green-600 text-white cursor-pointer">Refresh</button>
                        </div>
                    </div>




                    <div className="p-1 overflow-auto">
                        <table className="w-full border border-gray-200">
                            <thead>
                                <tr className="w-full bg-gray-200">
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Date</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Customer</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Invoice No</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Order No</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Shipment</th>
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
                                {deliverys.length ? (
                                    deliverys.map(delivery => (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={delivery._id}>
                                            <td className="text-center py-2 px-4">{date_format(delivery.dt)}</td>
                                            <td className="text-center py-2 px-4">{delivery.customer.name}</td>
                                            <td className="text-center py-2 px-4">{delivery.invoiceNo}</td>
                                            <td className="text-center py-2 px-4">{delivery.orderNo}</td>
                                            <td className="text-center py-2 px-4">{delivery.shipment}</td>
                                            <td className="text-center py-2 px-4">{delivery.deduct}</td>
                                            <td className="text-center py-2 px-4">{delivery.payment}</td>

                                            <td className="flex justify-end items-center space-x-1 mt-1 mr-2">
                                                <Delete message={messageHandler} id={delivery._id} data={deliverys} />
                                                <button onClick={() => printHandler(delivery._id)} className="w-7 h-7 flex justify-center items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                                                    </svg>
                                                </button>

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
            </div>
        </>
    );

};

export default Delivery;


