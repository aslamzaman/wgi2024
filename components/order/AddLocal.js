import React, { useEffect, useState } from "react";
import { TextEn, BtnEn, BtnSubmit, DropdownEn, TextNum } from "../Form";
import { Close } from "../Icons";
import { addItem, getItems } from "@/lib/utils/LocalDatabase";



const AddLocal = ({ Msg }) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [qty, setQty] = useState("");
    const [unit, setUnit] = useState("");
    const [taka, setTaka] = useState("");

    const [show, setShow] = useState(false);


    const [items, setItems] = useState([]);
    const [unittypes, setUnittypes] = useState([]);


    const resetStateVariables = () => {
        setName("");
        setDescription("");
        setQty("");
        setUnit("");
        setTaka("");
    }


    const createLocalitemObject = () => {
        return {
            id: Date.now(),
            name: name,
            description: description,
            qty: qty,
            unit: unit,
            taka: taka
        }
    }


    const addtHandler = () => {
        setShow(true);
        resetStateVariables();
        setItems(getItems('item'));
        setUnittypes(getItems('unittype'));
    }



    const saveHandler = (e) => {
        e.preventDefault();
        try {
            const localitemObject = createLocalitemObject();
            const local = addItem("localitem", localitemObject);
            Msg(local.message);
        } catch (error) {
            console.log(`Error saveing houserent data: ${error}`);
            Msg(local.message);
        }
        setShow(false);
    }



    return (
        <>
            <div className={`fixed inset-0 py-16 bg-gray-900 ${show ? 'block' : 'hidden'}  bg-opacity-60 overflow-auto z-50`}>
                <div className="w-11/12 md:w-8/12 mx-auto mb-10 bg-white bg-opacity-90 border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                        <h1 className="text-xl font-bold text-blue-600">Add New</h1>
                        <Close Click={() => { setShow(false); Msg("Data ready") }} Size="w-9 h-9" />
                    </div>

                    <div className="px-6 pb-6 text-black overflow-hidden">
                        <form onSubmit={saveHandler}>
                            <div className="grid grid-cols-2 gap-4 my-4">
                                <DropdownEn Title="Item" Id="name" Change={e => setName(e.target.value)} Value={name}>
                                    {items.length ? items.map(item => <option value={item.name} key={item._id}>{item.name}</option>) : null}
                                </DropdownEn>

                                <TextEn Title="Taka" Id="description" Change={e => setDescription(e.target.value)} Value={description} Chr={100} />
                                <TextNum Title="Quantity" Id="qty" Change={e => setQty(e.target.value)} Value={qty} />
                                <DropdownEn Title="Unittype" Id="unit" Change={e => setUnit(e.target.value)} Value={unit}>
                                    {unittypes.length ? unittypes.map(unittype => <option value={unittype.name} key={unittype._id}>{unittype.name}</option>) : null}
                                </DropdownEn>
                                <TextNum Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                            </div>
                            <div className="flex justify-start">
                                <BtnEn Title="Close" Click={() => { setShow(false); Msg("Data ready") }} Class="bg-red-600 hover:bg-red-800 text-white" />
                                <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <button onClick={addtHandler} className="w-7 h-7 bg-indigo-700 hover:bg-indigo-900 text-white flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default AddLocal;
