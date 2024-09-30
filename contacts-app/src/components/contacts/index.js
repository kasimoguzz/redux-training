import React from 'react'
import Form from "./Form"
import List from './List'
import {useSelector} from 'react-redux'
import {contactSelectors} from '../../redux/contactSlice'

function Contacts() {
  const total = useSelector(contactSelectors.selectTotal)
  return (
    <div className='contacts'>
        <h1>contact ({total})</h1>
        
        <List />
        <Form />
        
    </div>
  )
}

export default Contacts