import {useSelector} from 'react-redux'
import {contactSelectors} from '../../redux/contactSlice'
import Item from './Item'

function List() {
  
  const contacts = useSelector(contactSelectors.selectAll)

  return (
   <div>
     <ul className='list'>
        {
            contacts.map((contact)=>(
                <Item contact={contact} key={contact.id}/>
            ))
        }
    </ul>
   </div>
  )
}

export default List