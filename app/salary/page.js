"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/salary/Add";
import Edit from "@/components/salary/Edit";    
import Delete from "@/components/salary/Delete";
import {monthConvert} from "@/lib/SalaryMonths";


const Salary = () => {
    const [salarys, setSalarys] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/salary`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                console.log(data);
                setSalarys(data);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Salary</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>    
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">                           
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Employee</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Month</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Deduct</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Arear</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Note</th>                                
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end py-0.5 pr-4">
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {salarys.length ?(
                            salarys.map(salary => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={salary._id}>                                           
                                          <td className="text-center py-2 px-4">{salary.employee.name}</td>
                                          <td className="text-center py-2 px-4">{monthConvert(salary.month)}</td>
                                          <td className="text-center py-2 px-4">{salary.taka}</td>
                                          <td className="text-center py-2 px-4">{salary.deduct}</td>
                                          <td className="text-center py-2 px-4">{salary.arear}</td>
                                          <td className="text-center py-2 px-4">{salary.note}</td>                                            
                                    <td className="flex justify-end items-center space-x-1 mt-1">
                                        <Edit message={messageHandler} id={salary._id} data={salarys} />
                                        <Delete message={messageHandler} id={salary._id} data={salarys} />
                                    </td>
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan={7} className="text-center py-10 px-4">
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

export default Salary;


