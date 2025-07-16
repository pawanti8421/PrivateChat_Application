function UserList({ contacts, setActiveChat }) {
  return (
    <div className="user-list">
      {contacts.map((contact) => (
        <div
          className="user-item"
          key={contact.id._id}
          onClick={() => setActiveChat(contact)}
        >
          <div className="user-avatar"></div>
          <p>
            {contact.name} | {contact.id.phone}
          </p>
        </div>
      ))}
    </div>
  );
}
export default UserList;
