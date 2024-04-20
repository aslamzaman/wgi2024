import React, { useState } from "react";
import { TextEn, BtnSubmit, TextNum, DropdownEn, TextDt } from "@/components/Form";

const date_format = dt => new Date(dt).toISOString().split('T')[0];
import { getItems } from "@/lib/utils/LocalDatabase";



const Edit = ({ message, id, data }) => {
    const [dt, setDt] = useState('');
    const [shipmentNo, setShipmentNo] = useState('');
    const [lcId, setLcId] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [itemId, setItemId] = useState('');
    const [unittypeId, setUnittypeId] = useState('');
    const [qty, setQty] = useState('');
    const [taka, setTaka] = useState('');
    const [show, setShow] = useState(false);


    const [lcs, setLcs] = useState([]);
    const [lcIdChange, setLcIdChange] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const [supplierIdChange, setSupplierIdChange] = useState('');
    const [items, setItems] = useState([]);
    const [itemIdChange, setItemIdChange] = useState('');
    const [unittypes, setUnittypes] = useState([]);
    const [unittypeIdChange, setUnittypeIdChange] = useState('');



    const showEditForm = () => {
        setShow(true);
        setLcs(getItems('lc'));
        setSuppliers(getItems('supplier'));
        setItems(getItems('item'));
        setUnittypes(getItems('unittype'));
        //---------------------------------------------------------
        const { dt, shipmentNo, lcId, supplierId, itemId, unittypeId, qty, taka } = data.find(shipment => shipment._id === id) || { dt: '', shipmentNo: '', lcId: '', supplierId: '', itemId: '', unittypeId: '', qty: '', taka: '' };
        setDt(date_format(dt));
        setShipmentNo(shipmentNo);
        setLcId(lcId._id);
        setSupplierId(supplierId._id);
        setItemId(itemId._id);
        setUnittypeId(unittypeId._id);
        setQty(qty);
        setTaka(taka);
        //---------------------------------   

        setLcIdChange(lcId._id);
        setSupplierIdChange(supplierId._id);
        setItemIdChange(itemId._id);
        setUnittypeIdChange(unittypeId._id);

    };


    const closeEditForm = () => {
        setShow(false);
    };


    const createObject = () => {
        return {
            dt: dt,
            shipmentNo: shipmentNo,
            lcId: lcId,
            supplierId: supplierId,
            itemId: itemId,
            unittypeId: unittypeId,
            qty: qty,
            taka: taka
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/shipment/${id}`;
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message(`Updated successfully completed at ${new Date().toISOString()}`);
            } else {
                throw new Error("Failed to create shipment");
            }
        } catch (error) {
            console.error("Error saving shipment data:", error);
            message("Error saving shipment data.");
        } finally {
            setShow(false);
        }
    }


    const lcIdChangeHandler = (e) => {
        const lcIdValue = e.target.value;
        setLcIdChange(lcIdValue);
        setLcId(lcIdValue);
    }


    const supplierIdChangeHandler = (e) => {
        const supplierIdValue = e.target.value;
        setSupplierIdChange(supplierIdValue);
        setSupplierId(supplierIdValue);
    }

    const itemIdChangeHandler = (e) => {
        const itemIdValue = e.target.value;
        setItemIdChange(itemIdValue);
        setItemId(itemIdValue);
    }

    const unittypeIdChangeHandler = (e) => {
        const unittypeIdValue = e.target.value;
        setUnittypeIdChange(unittypeIdValue);
        setUnittypeId(unittypeIdValue);
    }



    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <button onClick={closeEditForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>

                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler} >
                                <div className="grid grid-cols-2 gap-4 my-4">
                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <TextEn Title="Shipmentno" Id="shipmentNo" Change={e => setShipmentNo(e.target.value)} Value={shipmentNo} Chr={50} />

                                    <DropdownEn Title="LC No" Id="lcIdChange" Change={lcIdChangeHandler} Value={lcIdChange}>
                                        {lcs.length ? lcs.map(lc => <option value={lc._id} key={lc._id}>{lc.lcNo}</option>) : null}
                                    </DropdownEn>

                                    <DropdownEn Title="Supplier" Id="supplierIdChange" Change={supplierIdChangeHandler} Value={supplierIdChange}>
                                        {suppliers.length ? suppliers.map(supplier => <option value={supplier._id} key={supplier._id}>{supplier.name}</option>) : null}
                                    </DropdownEn>

                                    <DropdownEn Title="Item" Id="itemIdChange" Change={itemIdChangeHandler} Value={itemIdChange}>
                                        {items.length ? items.map(item => <option value={item._id} key={item._id}>{item.name}</option>) : null}
                                    </DropdownEn>

                                    <DropdownEn Title="Unit Type" Id="unittypeIdChange" Change={unittypeIdChangeHandler} Value={unittypeIdChange}>
                                        {unittypes.length ? unittypes.map(unittype => <option value={unittype._id} key={unittype._id}>{unittype.name}</option>) : null}
                                    </DropdownEn>


                                    <TextNum Title="Quantity" Id="qty" Change={e => setQty(e.target.value)} Value={qty} />
                                    <TextNum Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>


                    </div >
                </div >
            )}
            <button onClick={showEditForm} title="Edit" className="px-1 py-1 hover:bg-teal-300 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-black hover:stroke-blue-800 transition duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;


