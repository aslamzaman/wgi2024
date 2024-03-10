import React, { useState } from "react";
import { TextEn, BtnSubmit, DropdownEn, TextNum, TextDt } from "@/components/Form";

const date_format = (dt)=>{
    return new Date(dt).toISOString().split('T')[0];
 }



const Edit = ({ message, id, data }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [post_id, setPost_id] = useState('');
    const [salary, setSalary] = useState('');
    const [join_dt, setJoin_dt] = useState('');
    const [contact, setContact] = useState('');
    const [show, setShow] = useState(false);


    const [posts, setPosts] = useState([]);


    const showEditForm = async () => {
        setShow(true);
        message("Ready to edit");
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const dataResponse = await response.json();
            console.log(dataResponse);
            setPosts(dataResponse);
            //--------------------------------------------------------------

            const { name, address, post_id, salary, join_dt, contact } = data.find(employee => employee._id === id) || { name: '', address: '', post_id: '', salary: '', join_dt: '', contact: '' };
            setName(name);
            setAddress(address);
            setPost_id(post_id._id);
            setSalary(salary);
            setJoin_dt(date_format(join_dt));
            setContact(contact);
            console.log(post_id._id);


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
            name: name,
            address: address,
            post_id: post_id,
            salary: salary,
            join_dt: join_dt,
            contact: contact
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/employee/${id}`;
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message("Updated successfully completed");
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
                                    <TextEn Title="Name" Id="name" Change={e => setName(e.target.value)} Value={name} Chr={50} />
                                    <TextEn Title="Address" Id="address" Change={e => setAddress(e.target.value)} Value={address} Chr={50} />
                                    <DropdownEn Title="Post" Id="post_id" Change={e => setPost_id(e.target.value)} Value={post_id}>
                                        {posts.length ? posts.map(post => <option value={post._id} key={post._id}>{post.name}</option>) : null}
                                    </DropdownEn>
                                    <TextNum Title="Salary" Id="salary" Change={e => setSalary(e.target.value)} Value={salary} />
                                    <TextDt Title="Join_dt" Id="join_dt" Change={e => setJoin_dt(e.target.value)} Value={join_dt} />
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
            <button onClick={showEditForm} title="Edit" className="px-1 py-1 bg-teal-600 hover:bg-teal-700 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;


