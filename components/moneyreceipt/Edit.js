import React, { useState } from "react";
import { TextEn, BtnSubmit } from "@/components/Form";
       

const Edit = ({ message, id, data }) => {        
    const [dt, setDt] = useState('');
    const [receiveNo, setReceiveno] = useState('');
    const [receivedFrom, setReceivedfrom] = useState('');
    const [taka, setTaka] = useState('');
    const [cashType, setCashtype] = useState('');
    const [bankName, setBankname] = useState('');
    const [chequeNo, setChequeno] = useState('');
    const [chequeDt, setChequedt] = useState('');
    const [purpose, setPurpose] = useState('');
    const [contact, setContact] = useState('');        
    const [show, setShow] = useState(false);


    const showEditForm =  () => {
        setShow(true);
        message("Ready to edit");
        try {
           const { dt, receiveNo, receivedFrom, taka, cashType, bankName, chequeNo, chequeDt, purpose, contact } = data.find(moneyreceipt => moneyreceipt._id === id) || { dt: '', receiveNo: '', receivedFrom: '', taka: '', cashType: '', bankName: '', chequeNo: '', chequeDt: '', purpose: '', contact: '' };
           setDt(dt);
           setReceiveno(receiveNo);
           setReceivedfrom(receivedFrom);
           setTaka(taka);
           setCashtype(cashType);
           setBankname(bankName);
           setChequeno(chequeNo);
           setChequedt(chequeDt);
           setPurpose(purpose);
           setContact(contact);             
        } catch (err) {
            console.log(err);
        }
    };


    const closeEditForm = () => {
        setShow(false);
        message("Data ready.");
    };


    const createObject = () => {
        return {
          dt: dt,
          receiveNo: receiveNo,
          receivedFrom: receivedFrom,
          taka: taka,
          cashType: cashType,
          bankName: bankName,
          chequeNo: chequeNo,
          chequeDt: chequeDt,
          purpose: purpose,
          contact: contact                
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/moneyreceipt/${id}`;
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message("Updated successfully completed");
            } else {
                throw new Error("Failed to create moneyreceipt");
            } 
        } catch (error) {
            console.error("Error saving moneyreceipt data:", error);
            message("Error saving moneyreceipt data.");
        }finally {
            setShow(false);
        }
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
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextEn Title="Dt" Id="dt" Change={e => setDt(e.target.value)} Value={dt} Chr={50} />
                                    <TextEn Title="Receiveno" Id="receiveNo" Change={e => setReceiveno(e.target.value)} Value={receiveNo} Chr={50} />
                                    <TextEn Title="Receivedfrom" Id="receivedFrom" Change={e => setReceivedfrom(e.target.value)} Value={receivedFrom} Chr={50} />
                                    <TextEn Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} Chr={50} />
                                    <TextEn Title="Cashtype" Id="cashType" Change={e => setCashtype(e.target.value)} Value={cashType} Chr={50} />
                                    <TextEn Title="Bankname" Id="bankName" Change={e => setBankname(e.target.value)} Value={bankName} Chr={50} />
                                    <TextEn Title="Chequeno" Id="chequeNo" Change={e => setChequeno(e.target.value)} Value={chequeNo} Chr={50} />
                                    <TextEn Title="Chequedt" Id="chequeDt" Change={e => setChequedt(e.target.value)} Value={chequeDt} Chr={50} />
                                    <TextEn Title="Purpose" Id="purpose" Change={e => setPurpose(e.target.value)} Value={purpose} Chr={50} />
                                    <TextEn Title="Contact" Id="contact" Change={e => setContact(e.target.value)} Value={contact} Chr={50} />                                        
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


