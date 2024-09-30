import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {editContact} from '../../redux/contactSlice'
import {useNavigate} from 'react-router-dom'

function EditForm({contact}) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [name, setName] = useState(contact.name)
    const [number, setNumber] = useState(contact.phone_number)

    const handleSubmit =(e)=>{
        e.preventDefault()

        if(!name || !number) return false;
        dispatch(editContact({
            id : contact.id,
            changes:{
                name,
                phone_number : number
            }
        }))
        navigate(-1)
    }

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
        <button type="submit">Add</button>
      </div>
    </form>
  </div>
  )
}

export default EditForm