import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import Modal from "../component/modal";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [contactIdToDelete, setContactIdToDelete] = useState(null);

  const handleDelete = (id) => {
    setContactIdToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    actions.deleteContact(contactIdToDelete);
    setShowModal(false);
  };

  const cancelDelete = () => {
	console.log("Canceled delete")
    setShowModal(false);
  };

  return (
    <div className="container text-center mt-5">
      <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-3">
        <Link to="/contact" className="btn btn-success mb4">
          Add new contact
        </Link>
      </div>
      <ul className="list-group">
        {store.contacts.map((contact) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={contact.id}
          >
            <div className="d-flex align-items-center">
              <img
                src="../rigo-baby.jpg"
                className="img-fluid rounded-circle"
                alt={contact.name}
                style={{ width: "200px", height: "180px" }}
              ></img>
              <div className="text-start contact-info">
                <h4>{contact.name}</h4>
                <p className="text-secondary">
                  <i className="bi bi-geo-alt-fill"> </i>
                  {contact.address}
                </p>
                <p className="text-secondary">
                  <i className="bi bi-telephone-fill"> </i>
                  {contact.phone}
                </p>
				<p className="text-secondary">
                  <i className="bi bi-envelope-fill"> </i>
                  {contact.email}
                </p>
              </div>
            </div>

            <div className="icons">
              <Link to={"/contact/" + contact.id}>
                <i className="bi bi-pen-fill icon-pen"></i>
              </Link>
              <i
                className="bi bi-trash-fill icon-trash"
                onClick={() => handleDelete(contact.id)}
              ></i>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        show={showModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
