import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import axios from 'axios'
import Loading from '../../components/Loading'

function Detail() {
  const {char_id} = useParams()
  const [char,setChar] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
      axios(`https://rickandmortyapi.com/api/character/${char_id}`)
      .then((res)=> res.data)
      .then((data)=> setChar(data))
      .finally(()=> setLoading(false))

  },[char_id])
  
  return (
    <>

    {
      loading && <Loading />
    }

    {char && <div className="character-card">
        <h2>{char.name}</h2>
        <img src={char.image} alt={char.name} />
        <p><strong>Status:</strong> {char.status}</p>
        <p><strong>Species:</strong> {char.species}</p>
        <p><strong>Gender:</strong> {char.gender}</p>
        <p><strong>Origin:</strong> <a href={char.origin.url}>{char.origin.name}</a></p>
        <p><strong>Location:</strong> <a href={char.location.url}>{char.location.name}</a></p>
        <p><strong>Episodes:</strong></p>
        <p><small>Created on: {new Date(char.created).toLocaleDateString()}</small></p>
      </div>
    }
    </>
  )
}

export default Detail