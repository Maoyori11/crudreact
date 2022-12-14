import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'


function App() {

  const baseURL = 'https://users-crud1.herokuapp.com'

  const [users, setUsers] = useState()
  // Esto para pasar información desde UserCard hasta FormUser
  const [updateInfo, setUpdateInfo] = useState()
  const [formIsClose, setFormIsClose] = useState(true)

  // para hacer el get de todos los users

  const getAllUsers =() =>{
    const URL = `${baseURL}/users/`
    axios.get(URL)
    .then(res => setUsers(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

// para crar nuevos usuarios
const createNewUser = data =>{
  const URL = `${baseURL}/users/`
  axios.post(URL, data)
  .then(res => {
    console.log(res.data)
    getAllUsers()
  })
  .catch(err => console.log(err))
}

// Para eliminar un usuario especifico 

const deleteUserById = id =>{
  const URL = `${baseURL}/users/${id}/`
  axios.delete(URL)
  .then(res =>{
    console.log(res.data)
    getAllUsers()
  })
  .catch(err => console.log(err))
}

// para actualizar un usuario en especifico

const updateUserById = (id, data) =>{
  const URL = `${baseURL}/users/${id}/`
  axios.patch(URL, data)
  .then(res => {
    getAllUsers()
    console.log(res.data)
  })
  .catch(err => console.log(err))
}

const handleOpenform = () => {
  setFormIsClose(false)
}

  return (
    <div className="App">
      <div className='App__container-title'>
      <h1 className='App__title'>Users CRUD</h1>
      <button onClick={handleOpenform} className='App__btn'>Create a New User</button>
      </div>
      <div className={`form-container ${formIsClose && 'disable__form'}`}>
      <FormUsers 
      createNewUser= {createNewUser}
      updateInfo ={updateInfo}
      updateUserById = {updateUserById}
      setUpdateInfo = {setUpdateInfo}
      setFormIsClose = {setFormIsClose}
      />
      </div>

      <div className='users__container'>
      {
        users?.map(user =>(
          <UserCard
          key={user.id}
          user={user}
          deleteUserById = {deleteUserById}
          setUpdateInfo = {setUpdateInfo}
          setFormIsClose = {setFormIsClose}
          />
        ))
      }
      </div>
    </div>
  )
}

export default App
