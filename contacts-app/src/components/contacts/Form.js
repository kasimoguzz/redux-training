import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact ,removeContactAll , contactSelectors} from "../../redux/contactSlice";
import { nanoid } from "@reduxjs/toolkit";


function Form() {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !number) return false;
    dispatch(addContact({ id: nanoid(), name, phone_number: number }));
    setName("");
    setNumber("");
  };

  const handleRemoveAll = () =>{
    if(window.confirm("are you sure")){
      dispatch(removeContactAll())
    }
  }

  const total = useSelector(contactSelectors.selectTotal)

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="phone number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <div>
          {total > 0 && <button onClick={handleRemoveAll}  style={{backgroundColor:"red"}}>remove all</button>}
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
