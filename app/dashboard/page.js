"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/item/Add";
import Edit from "@/components/item/Edit";    
import Delete from "@/components/item/Delete";


const Item = () => {
    const [items, setItems] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    
    return (
        <>
            <div className="w-full my-6 lg:my-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Dashboard</h1>
            </div>    
          
        </>
    );

};

export default Item;


