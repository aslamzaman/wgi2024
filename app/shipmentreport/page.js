"use client";
import React, { useState, useEffect } from "react";
// import Details from "@/components/due/Details";
import { BtnSubmit, DropdownEn, TextNum, TextDt } from "@/components/Form";


import { GetRemoteData } from "@/lib/utils/GetRemoteData";
import { numberWithComma } from "@/lib/NumberWithComma";
import { jsPDF } from "jspdf";
const date_format = dt => new Date(dt).toISOString().split('T')[0];
import { inword } from "@/lib/Inword";
require("@/lib/fonts/Poppins-Bold-normal");
require("@/lib/fonts/Poppins-Regular-normal");
import Add from "@/components/shipmentreport/Add";
const getUniqueValues = (array) => (
    array.filter((currentValue, index, arr) => (
        arr.indexOf(currentValue) === index
    ))
)




const Shipmentreport = () => {
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");
 
    const [sales, setSales] = useState([]);
    const [saleSummery, setSaleSummery] = useState([]);



    useEffect(() => {
        const loadData = async () => {
            setWaitMsg('Please Wait...');
            try {

                const [sales, payments] = await Promise.all([
                    GetRemoteData('sale'),
                    GetRemoteData('payment')
                ]);


                const arrShipment = sales.map(sale => sale.shipment);

                const shipments = getUniqueValues(arrShipment);


                setSales(sales);

                const result = shipments.map(shipment => {
                    const oneSale = sales.find(sale=> sale.shipment=== shipment);
                    const matchingSale = sales.filter(sale => sale.shipment === shipment);
                    const totalBale = matchingSale.reduce((t, c) => t + parseFloat(c.bale), 0);
                    const totalThan = matchingSale.reduce((t, c) => t + parseFloat(c.than), 0);
                    const totalMeter = matchingSale.reduce((t, c) => t + parseFloat(c.meter), 0);
                    const totalWeitht = matchingSale.reduce((t, c) => t + parseFloat(c.weight), 0);
                    const totalTaka = matchingSale.reduce((t, c) => t + (parseFloat(c.weight) * parseFloat(c.rate)), 0);
                    return {customerName: oneSale.customerId.name,
                        saleDate: oneSale.dt,
                         shipment, totalBale, totalThan, totalMeter, totalWeitht, totalTaka };
                });
                console.log(result);
                setSaleSummery(result);
                setWaitMsg('');
            } catch (error) {
                console.error("Error fetching data:", error);
                setMsg("Failed to fetch data");
            }
        }
        loadData();
       
    }, [msg]);




    const messageHandler = (data) => {
        setMsg(data);
    }


    const printHandler = (id) => {
        // console.log(customers, id)

        setWaitMsg('Please Wait...');
        setTimeout(() => {
            const customer = customers.find(customer => customer._id === id);

            // console.log(customer);

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
            doc.text(`Date: ${date_format(new Date())}`, 198, 35, null, null, "right");
            doc.setFont("Poppins-Bold", "bold");
            doc.text("Sales Information", 12, 37, null, null, "left");
            doc.text("Date", 25, 43, null, null, "center");
            doc.text("Shipment", 50, 43, null, null, "center");
            doc.text("Bale & Meter", 89, 43, null, null, "center");
            doc.text("Description", 146, 43, null, null, "center");
            doc.text("Amount", 196, 43, null, null, "right");
            doc.line(12, 39, 198, 39);
            doc.line(12, 45, 198, 45);
            doc.setFont("Poppins-Regular", "normal");
            doc.setFontSize(10);
            let y = 49;
            let gt = 0;
            let totalKgs = 0;
            let totalMeter = 0;
            let totalBale = 0;
            let itemTimes = 0;
            const sale = customer.matchingSale;
            for (let i = 0; i < sale.length; i++) {
                let subTotal = parseFloat(sale[i].weight) * parseFloat(sale[i].rate);
                doc.text(`${date_format(sale[i].dt)}`, 25, y, null, null, "center");
                doc.text(`${sale[i].shipment}`, 50, y, null, null, "center");
                doc.text(`${sale[i].bale}bale;${sale[i].meter}mtr.`, 89, y, null, null, "center");
                doc.text(`${sale[i].weight} @ ${sale[i].rate}`, 146, y, null, null, "center");
                doc.text(`${numberWithComma(subTotal)}`, 196, y, null, null, "right");
                gt = gt + subTotal;
                totalKgs = totalKgs + parseFloat(sale[i].weight);
                totalMeter = totalMeter + parseFloat(sale[i].meter);
                totalBale = totalBale + parseFloat(sale[i].bale);
                itemTimes = i + 1;
                y = y + 5;
            }
            doc.setFont("Poppins-Bold", "bold");
            doc.line(12, y - 3, 198, y - 3);
            doc.text(`Total (${totalKgs}kgs at ${itemTimes} Times); [Total: Bale= ${totalBale}; Meter=${totalMeter}]`, 14, y + 1, null, null, "left");
            doc.text(`${numberWithComma(gt)}`, 196, y + 1, null, null, "right");
            doc.line(12, y + 2.5, 198, y + 2.5);


            doc.line(12, 39, 12, y + 2.5);
            doc.line(198, 39, 198, y + 2.5);

            // -------------------------------------------------------------

            let z = y + 10;
            doc.setFont("Poppins-Bold", "bold");
            doc.text("Payments Information", 12, z, null, null, "left");
            doc.line(12, z + 1, 198, z + 1);
            doc.text("Date", 30, z + 5, null, null, "center");
            doc.text("Cash Type", 90, z + 5, null, null, "center");
            doc.text("Amount", 196, z + 5, null, null, "right");
            doc.line(12, z + 6.5, 198, z + 6.5);

            doc.setFont("Poppins-Regular", "normal");
            let n = z + 11;
            let paymentTotal = 0;
            let paymentTimes = 0;
            const payment = customer.matchingPayment;
            for (let i = 0; i < payment.length; i++) {
                doc.text(`${date_format(payment[i].dt)}`, 30, n, null, null, "center");
                doc.text(`${payment[i].cashtypeId.name}`, 90, n, null, null, "center");
                doc.text(`${payment[i].taka}`, 196, n, null, null, "right");
                paymentTotal = paymentTotal + parseFloat(payment[i].taka);
                paymentTimes = i + 1;
                n = n + 5;
            }
            doc.setFont("Poppins-Bold", "bold");
            doc.line(12, n - 3, 198, n - 3);
            doc.text(`Total (${paymentTimes} Times)`, 14, n + 1, null, null, "left");
            doc.text(`${numberWithComma(paymentTotal)}`, 196, n + 1, null, null, "right");
            doc.line(12, n + 2.5, 198, n + 2.5);

            doc.line(12, z + 1, 12, n + 2.5);
            doc.line(198, z + 1, 198, n + 2.5);


            doc.line(12, n + 10, 198, n + 10);
            doc.setFont("Poppins-Bold", "bold");
            doc.text(`Total Payable: (${gt} - ${paymentTotal}) = `, 14, n + 14, null, null, "left");

            doc.text(`${numberWithComma(parseFloat(customer.balance))}`, 196, n + 14, null, null, "right");
            doc.line(12, n + 16, 198, n + 16);

            doc.line(12, n + 10, 12, n + 16);
            doc.line(198, n + 10, 198, n + 16);

            doc.setFont("Poppins-Regular", "normal");
            doc.text(`INWORD: ${inword(customer.balance).toUpperCase()}`, 12, n + 21, null, null, "left");

            /*
    
    
    
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
            doc.text(`Balance: (${numberWithComma(dgt)} - ${numberWithComma(pgt)}) = ${numberWithComma(dgt - pgt)}/-`, 12, p + 2, null, null, "left");
    */
            doc.save(`Customer_Details_Created_${date_format(new Date())}.pdf`);
            setWaitMsg('');
        }, 0);




    }



    const searchClickHandler = () => {


        // search customer in date ranges
        const searchSale = sales.filter(sale => {
            const dataDate = new Date(sale.dt);
            return dataDate >= d1 && dataDate <= d2;
        })

        const result = newDues.filter(due => searchSale.some(sale => sale.customerId._id === due._id));
        // console.log(result);
        setCustomers(result);
        const total = result.reduce((t, c) => t + parseFloat(c.balance), 0);
        setTotalDue(total);

    }

    const refreshClickHandler = () => {
        setCustomers(newDues);
        const total = newDues.reduce((t, c) => t + parseFloat(c.balance), 0);
        setTotalDue(total);
    }



    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Report Summery on Shipment</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>

            <div className="px-4 lg:px-6 overflow-auto">
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Shipment</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Bale</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Thaan</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Meter</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">weight</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Taka(Wgt)</th>
                            <th className="text-end border-b border-gray-200 px-4 py-2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saleSummery.length ? (
                            saleSummery.map((customer,i) => (
                                <tr className={`border-b border-gray-200 hover:bg-gray-100 ${customer.isDues ? 'text-black' : 'text-blue-500'}`} key={customer.shipment}>
                                    <td className="text-center py-2 px-4">{i+1}</td>
                                    <td className="text-center py-2 px-4">{customer.shipment}</td>
                                    <td className="text-center py-2 px-4">{numberWithComma(customer.totalBale)}</td>
                                    <td className="text-center py-2 px-4">{numberWithComma(customer.totalThan)}</td>
                                    <td className="text-center py-2 px-4">{numberWithComma(customer.totalMeter)}</td>
                                    <td className="text-center py-2 px-4">{numberWithComma(customer.totalWeitht)}</td>
                                    <td className="text-center py-2 px-4">{numberWithComma(customer.totalTaka)}/-</td>
                                    <td className="text-end py-2 px-4">
                                        <div className="flex justify-end space-x-3">
                                            <Add message={messageHandler} sales={sales} saleSummery={saleSummery} shipment={customer.shipment} />
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

export default Shipmentreport;


