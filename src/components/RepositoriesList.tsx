import {useState} from "react";

import {useActions} from '../hooks/useActions'
import {useTypedSelector} from '../hooks/useTypedSelector'

export default function RepositoriesList() {
  const {searchRepositories} = useActions()
  const {data, error, loading} = useTypedSelector((state) => state.repositories)
  
  const [term, setTerm] = useState('')
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    searchRepositories(term);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)}/>
        <button>Serach</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading &&
        data.map(name => {
          return <div key={name}>{name}</div>
        })
      }
    </div>
  )
}