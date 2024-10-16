const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		contacts: [],
	  },
	  actions: {
		// Use getActions to call a function within a fuction
		getContacts: async () => {
		  try {
			const response = await fetch(
			  "https://playground.4geeks.com/contact/agendas/helen"
			);
			const data = await response.json();
			setStore({ contacts: data.contacts });
		  } catch (error) {
			console.error("Error getting contacts", error);
		  }
		},

		addContact: async (contact) => {
		  try {
			const response = await fetch(
			  "https://playground.4geeks.com/contact/agendas/helen/contacts",
			  {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(contact),
			  }
			);
			if (response.ok) {
				console.log("Contact added")
			  	await getActions().getContacts();
			} else {
				const errorData = await response.json();
				console.error("Failed to add contact, status:", response.status, "Error data:" , errorData) }
		  } catch (error) {
			console.log("Contact not added", error);
		  }
		},
  
		updateContact: async (id, contact) => {
		  try {
			const response = await fetch(
			  "https://playground.4geeks.com/contact/agendas/helen/contacts/" + id,
			  {
				method: "PUT",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(contact),
			  }
			);
			if (response.ok) {
			  getActions().getContacts();
			}
			const updateContact = await response.json()
			const newList = [...getStore().contacts]
			const index = newList.findIndex(contact => contact.id == id)
			newList[index] = updateContact
			setStore({ contacts: newList })
		  } catch (error) {
			console.log("Error updating contact", error);
		  }
		},
  
		deleteContact: async (id) => {
		  try {
			const response = await fetch(
			  `https://playground.4geeks.com/contact/agendas/helen/contacts/${id}`,
			  {
				method: "DELETE",
			  }
			);
			if (response.ok) {
				await getActions().getContacts();
			}
		  } catch (error) {
			console.log("Contact not deleted", error);
		  }
		},
	  },
	};
  };
  
  export default getState;
  
