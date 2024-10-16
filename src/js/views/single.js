import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { createRoutesFromChildren, Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const {idContact} = useParams();
	const [currentContact, setCurrentContact] = useState({});
	const navigate = useNavigate();

	async function submitForm(e){
		e.preventDefault();
		const formData = new FormData(e.target);
		const contactData = {};
		formData.forEach((val,key) => (contactData[key] = val));

		if (idContact) {
			await actions.updateContact(currentContact.id, contactData);
		} else {
			await actions.addContact(contactData)
		}
		navigate("/")
	}

	useEffect(() => {
		const contact = store.contacts.find(contact => contact.id == idContact)
		if (contact) {
			setCurrentContact(contact)
		} else {
			setCurrentContact({})
		}
	}, [idContact, store.contacts])

	return (
		<div className="container">
			<h1 className="text-center">{!idContact ? "Add a new contact" : `Edit contact: ${currentContact.id}`}</h1>
			<form onSubmit={submitForm}>
				{!currentContact
				?"Not contacts found"
				: (
					<>
					{/* Name Field */}
					<div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                name="name" 
                                placeholder="Enter name" 
                                defaultValue={currentContact.name || ""}  
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                placeholder="Enter email" 
                                defaultValue={currentContact.email || ""} 
                            />
                        </div>

                        {/* Phone Field */}
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input 
                                type="tel" 
                                className="form-control" 
                                id="phone" 
                                name="phone" 
                                placeholder="Enter phone number" 
                                defaultValue={currentContact.phone || ""} 
                            />
                        </div>

                        {/* Address Field */}
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="address" 
                                name="address" 
                                placeholder="Enter address" 
                                defaultValue={currentContact.address || ""} 
                            />
                        </div>
					
					</>
				)
				}
				<div className="d-grid gap-2">
					<button className="btn btn-primary" type="submit" role="button">Save</button>
				</div>
				<Link to="/">
					<p className="mb-0">or get back to contacts</p>
				</Link>
			</form>
		</div>
	);
};
