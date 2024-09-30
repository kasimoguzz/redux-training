import { useDispatch } from "react-redux";
import { removeContact } from "../../redux/contactSlice";
import { Link } from "react-router-dom";

function Item({ contact }) {
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    if (window.confirm("are you sure")) {
      dispatch(removeContact(id));
    }
  };

  return (
    <li>
      <span>{contact.name}</span>
      <span>{contact.phone_number}</span>
      <div>
        <span className="edit-btn">
          <Link to={`/edit/${contact.id}`}>✏️</Link>  
        </span>
        
        <span className="removeBtn" onClick={() => handleRemove(contact.id)}>
        ❌
        </span>
      </div>
    </li>
  );
}

export default Item;
