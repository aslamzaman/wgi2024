import React, { useState } from "react";
import { BtnEn } from "../../components/Form";
import { Close } from "../Icons";
import { deleteItem } from "@/lib/utils/LocalDatabase";


const DeleteLocal = ({ Msg, Id }) => {
    const [show, setShow] = useState(false);


    const deleteHandler = () => {
        setShow(true);
    }


    const removeHandler = () => {
        try {
            let deletedItem = deleteItem("localitem", Id);
            Msg(deletedItem.message);
        } catch (error) {
            console.log(`Error deleting data: ${error}`);
        }
        setShow(false);
    }



    return (
        <>
            <div className={`fixed inset-0 py-16 bg-gray-900 ${show ? 'block' : 'hidden'}  bg-opacity-60 overflow-auto`}>
                <div className="w-11/12 md:w-8/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                        <h1 className="text-xl font-bold text-blue-600">Delete Existing</h1>
                        <Close Click={() => { setShow(false); Msg("Data ready") }} Size="w-9 h-9" />
                    </div>

                    <div className="p-6 text-black">
                        <p className="text-left text-md text-red-400">Are you sure delete?</p>
                    </div>

                    <div className="px-6 py-6 flex justify-end items-center border-t border-gray-300">
                        <BtnEn Title="Close" Click={() => { setShow(false); Msg("Data ready") }} Class="bg-red-600 hover:bg-red-800 text-white mr-1" />
                        <BtnEn Title="Yes" Click={removeHandler} Class="bg-blue-600 hover:bg-blue-800 text-white" />
                    </div>
                </div>
            </div>
            <button onClick={deleteHandler} className="w-7 h-7 bg-red-700 hover:bg-red-900 text-white flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </>
    )
}
export default DeleteLocal;
