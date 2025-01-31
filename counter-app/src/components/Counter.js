import {useState} from 'react'
import {useSelector ,useDispatch} from 'react-redux'
import {increment, decrement,incrementByAmount} from '../redux/counter/CounterSlice'

function Counter() {
    const [amount, setAmount] = useState(3) 
    const countValue = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
  return (
    <div>
        <h1>{countValue}</h1>

        <button onClick={()=> dispatch(decrement())}>decrement</button>
        <button onClick={()=> dispatch(increment())}>increment</button>
        <br /><br />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <br />
        <button onClick={()=> dispatch(incrementByAmount(amount))}>increment by amount</button>
    </div>
  )
}

export default Counter