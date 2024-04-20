"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/employee/Add";
import Edit from "@/components/employee/Edit";    
import Delete from "@/components/employee/Delete";
const date_format = dt => new Date(dt).toISOString().split('T')[0];



const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/employee`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                //console.log(data);
                localStorage.setItem("employee", JSON.stringify(data));
                setEmployees(data);
            setWaitMsg('');
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Employee</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>  
                <div className="p-2 overflow-auto">  
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">                           
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Address</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Post</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Salary</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Joindt</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Contact</th>                                
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length ?(
                                employees.map(employee => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={employee._id}>                                           
                                          <td className="text-center py-2 px-4">{employee.name}</td>
                                          <td className="text-center py-2 px-4">{employee.address}</td>
                                          <td className="text-center py-2 px-4">{employee.postId.name}</td>
                                          <td className="text-center py-2 px-4">{employee.salary}</td>
                                          <td className="text-center py-2 px-4">{date_format(employee.joinDt)}</td>
                                          <td className="text-center py-2 px-4">{employee.contact}</td>                                            
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={employee._id} data={employees} />
                                            <Delete message={messageHandler} id={employee._id} data={employees} />
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
            </div>
        </>
    );

};

export default Employee;


