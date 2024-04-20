import React, { useState } from "react";
import { TextEn, BtnSubmit, DropdownEn, TextNum, TextDt } from "@/components/Form";
import { getItems } from "@/lib/utils/LocalDatabase";
const date_format = dt => new Date(dt).toISOString().split('T')[0];




const Add = ({ message }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [postId, setPostId] = useState('');
    const [salary, setSalary] = useState('');
    const [joinDt, setJoinDt] = useState('');
    const [contact, setContact] = useState('');
    const [show, setShow] = useState(false);

    const [posts, setPosts] = useState([]);
    const [postIdChange, setPostIdChange] = useState('');


    const resetVariables = () => {
        setName('');
        setAddress('');
        setPostId('');
        setSalary('');
        setJoinDt(date_format(new Date()));
        setContact('');
    }


    const showAddForm = async () => {
        setShow(true);
        resetVariables();
        setPosts(getItems('post'));
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
        return {
            name: name,
            address: address,
            postId: postId,
            salary: salary,
            joinDt: joinDt,
            contact: contact
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/employee`;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message(`Employee is created at ${new Date().toISOString()}`);
            } else {
                throw new Error("Failed to create employee");
            }
        } catch (error) {
            console.error("Error saving employee data:", error);
            message("Error saving employee data.");
        } finally {
            setShow(false);
        }
    }


    const postIdChangeHandler = (e) => {
        const postIdValue = e.target.value;
        setPostIdChange(postIdValue);
        setPostId(postIdValue);
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
                                    <TextEn Title="Name" Id="name" Change={e => setName(e.target.value)} Value={name} Chr={50} />
                                    <TextEn Title="Address" Id="address" Change={e => setAddress(e.target.value)} Value={address} Chr={150} />

                                    <DropdownEn Title="Post" Id="postIdChange" Change={postIdChangeHandler} Value={postIdChange}>
                                        {posts.length ? posts.map(post => <option value={post._id} key={post._id}>{post.name}</option>) : null}
                                    </DropdownEn>

                                    <TextNum Title="Salary" Id="salary" Change={e => setSalary(e.target.value)} Value={salary} />
                                    <TextDt Title="Joining Date" Id="joinDt" Change={e => setJoinDt(e.target.value)} Value={joinDt} />
                                    <TextEn Title="Contact" Id="contact" Change={e => setContact(e.target.value)} Value={contact} Chr={50} />
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

