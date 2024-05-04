import React, { useState } from "react";
import { TextEn, BtnSubmit, DropdownEn, TextNum, TextDt } from "@/components/Form";
import { GetRemoteData } from "@/lib/utils/GetRemoteData";
const date_format = dt => new Date(dt).toISOString().split('T')[0];


const Add = ({ message }) => {
    const [customerId, setCustomerId] = useState('');
    const [dt, setDt] = useState('');
    const [cashtypeId, setCashtypeId] = useState('');
    const [bank, setBank] = useState('');
    const [chequeNo, setChequeNo] = useState('');
    const [chequeDt, setChequeDt] = useState('');
    const [taka, setTaka] = useState('');

    const [show, setShow] = useState(false);

    const [customers, setCustomers] = useState([]);
    const [cashtypes, setCashtypes] = useState([]);
    const [bankShow, setBankShow] = useState(false);



    const resetVariables = () => {
        setCustomerId('');
        setDt(date_format(new Date()));
        setCashtypeId("65ede62b29c4f0b23474c11f");
        setBank(' ');
        setChequeNo(' ');
        setChequeDt(date_format(new Date()));
        setTaka('');
        setBankShow(false);
    }


    const showAddForm = async () => {
        setShow(true);
        resetVariables();
        try {
            const responseCustomer = await GetRemoteData('customer');
            setCustomers(responseCustomer);
            const responseCashtype = await GetRemoteData('cashtype');
            setCashtypes(responseCashtype);
        } catch (error) {
            console.error('Failed to fetch delivery data:', error);
        }
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
        return {
            customerId: customerId,
            dt: dt,
            cashtypeId: cashtypeId,
            bank: bank,
            chequeNo: chequeNo,
            chequeDt: chequeDt,
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


    const cashTypeChangeHandler = (e) => {
        let event = e.target.value;
        setCashtypeId(event);
        if (event === "65ede63629c4f0b23474c123") {
            setBankShow(true);
            setBank('');
            setChequeNo('');
            setChequeDt(date_format(new Date()));

        } else {
            setBankShow(false);
            setBank(' ');
            setChequeNo(' ');
            setChequeDt(date_format(new Date()));
        }
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

                                    <DropdownEn Title="Customer" Id="customerId" Change={e => setCustomerId(e.target.value)} Value={customerId}>
                                        {customers.length ? customers.map(customer => <option value={customer._id} key={customer._id}>{customer.name}</option>) : null}
                                    </DropdownEn>

                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <DropdownEn Title="Cash Type" Id="cashtypeId" Change={cashTypeChangeHandler} Value={cashtypeId}>
                                        {cashtypes.length ? cashtypes.map(cashtype => <option value={cashtype._id} key={cashtype._id}>{cashtype.name}</option>) : null}
                                    </DropdownEn>
                                    {bankShow ? (<>
                                        <TextEn Title="Bank" Id="bank" Change={e => setBank(e.target.value)} Value={bank} Chr={50} />
                                        <TextEn Title="Cheque Number" Id="chequeNo" Change={e => setChequeNo(e.target.value)} Value={chequeNo} Chr={50} />
                                        <TextDt Title="Cheque Date" Id="chequeDt" Change={e => setChequeDt(e.target.value)} Value={chequeDt} />
                                    </>) : null}
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

