import React, { useState } from "react";
import { TextEn, BtnSubmit, DropdownEn, TextDt, TextNum } from "@/components/Form";
import { getItems } from "@/lib/utils/LocalDatabase";


const Add = ({ message }) => {
    const [customerObject, setCustomerObject] = useState('');
    const [dt, setDt] = useState('');
    const [cashtypeObject, setCashtypeObject] = useState('');
    const [bank, setBank] = useState('');
    const [taka, setTaka] = useState('');
    const [show, setShow] = useState(false);


    const [customers, setCustomers] = useState([]);
    const [cashtypes, setCashtypes] = useState([]);

    const [customerFullObject, setCustomerFullObject] = useState({});
    const [cashTypeFullObject, setCashTypeFullObject] = useState({});


    const resetVariables = () => {
        setCustomerObject('');
        setDt('');
        setCashtypeObject('');
        setBank('');
        setTaka('');
    }


    const showAddForm = () => {
        setShow(true);
        resetVariables();
        setCustomers(getItems('customer'));
        setCashtypes(getItems('cashtype'));

    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
       
        return {
            customerObject: {_id:customerFullObject._id, name: customerFullObject.name, contact: customerFullObject.contact},
            dt: dt,
            cashtypeObject:  {_id: cashTypeFullObject._id, name: cashTypeFullObject.name},
            bank: bank,
            taka: taka
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message(`Payment is created at ${new Date().toISOString()}`);
            } else {
                throw new Error("Failed to create payment");
            }
        } catch (error) {
            console.error("Error saving payment data:", error);
            message("Error saving payment data.");
        } finally {
            setShow(false);
        }
    }



    const customerObjectChangeHandler = (e)=>{
        setCustomerObject(e.target.value);
        const customerObj = customers.find(customer=> customer._id ===  e.target.value);
        setCustomerFullObject(customerObj);
        //console.log(customerObj);
    }



    const cashtypeObjectChangeHandler = (e)=>{
        setCashtypeObject(e.target.value);
        const cashTypeObj = cashtypes.find(cashtype=> cashtype._id ===  e.target.value);
       // console.log(cashTypeObj);
        setCashTypeFullObject(cashTypeObj);
    }



    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <DropdownEn Title="Customer" Id="customerObject" Change={customerObjectChangeHandler} Value={customerObject}>
                                        {customers.length ? customers.map(customer => <option value={customer._id} key={customer._id}>{customer.name}</option>) : null}
                                    </DropdownEn>

                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />

                                    <DropdownEn Title="Cashtype" Id="cashtypeObject" Change={cashtypeObjectChangeHandler} Value={cashtypeObject}>
                                        {cashtypes.length ? cashtypes.map(cashtype => <option value={cashtype._id} key={cashtype._id}>{cashtype.name}</option>) : null}
                                    </DropdownEn>

                                    <TextEn Title="Bank" Id="bank" Change={e => setBank(e.target.value)} Value={bank} Chr={50} />
                                    <TextNum Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showAddForm} className="px-1 py-1 bg-blue-500 hover:bg-blue-700 rounded-md transition duration-500" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default Add;

