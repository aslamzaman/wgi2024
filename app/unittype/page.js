"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/unittype/Add";
import Edit from "@/components/unittype/Edit";    
import Delete from "@/components/unittype/Delete";


const Unittype = () => {
    const [unittypes, setUnittypes] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unittype`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                console.log(data);
                setUnittypes(data);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Unit Type</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>    
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">                           
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>                                
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end py-0.5 pr-4">
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {unittypes.length ?(
                            unittypes.map(unittype => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={unittype._id}>                                           
                                          <td className="text-center py-2 px-4">{unittype.name}</td>                                            
                                    <td className="flex justify-end items-center space-x-1 mt-1">
                                        <Edit message={messageHandler} id={unittype._id} data={unittypes} />
                                        <Delete message={messageHandler} id={unittype._id} data={unittypes} />
                                    </td>
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan={2} className="text-center py-10 px-4">
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

export default Unittype;


