import { useEffect, useState } from "react";
import "./sidebar.css";
import SideBarHeader from "./SideBarHeader";
import UserList from "./UserLIst";
import axios from "axios";

function Sidebar({ setActiveChat }) {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchContacts = () => {
    axios
      .get("http://localhost:8000/api/v1/contact/get-all-contact", {
        withCredentials: true,
      })
      .then((data) => {
        setContacts(data.data.data);
      })
      .catch((err) => {
        alert(err.response?.data.message);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, [newContact]);

  const handleAddContact = () => {
    const count = newContact + 1;
    setNewContact(count);
    fetchContacts();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <SideBarHeader handleAddContact={handleAddContact} />
      <input
        type="text"
        name="contactsearch"
        placeholder="Search"
        className="search-bar"
        value={searchTerm}
        onChange={handleSearch}
      />
      <UserList contacts={filteredContacts} setActiveChat={setActiveChat} />
    </div>
  );
}

export default Sidebar;
