import './App.css'
import { Route, Routes } from 'react-router'
import {Home} from './pages/Home'
import {Recipes} from './pages/Recipes'
import {RecipesForm} from './pages/RecipesForm'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PwReset from './pages/PwReset'
import {UserProfile} from './pages/UserProfile'
import { ProtectedRoute } from './ProtectedRoute'
import { NotFound } from './components/NotFound'
import { useContext } from 'react'
import { MyUserContext } from './context/MyUserProvider'
import MyToastify from './components/MyToastify'

function App() {

    const {msg, setMsg} = useContext(MyUserContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/recipes' element={<Recipes />}></Route>
        <Route path='/addnew' element={<ProtectedRoute><RecipesForm/></ProtectedRoute>}></Route>
        <Route path='/edit/:id' element={<ProtectedRoute><RecipesForm /></ProtectedRoute>}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/pwreset' element={<PwReset />}></Route>
        <Route path='/userProfile' element={<ProtectedRoute><UserProfile /></ProtectedRoute> }></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      {msg && <MyToastify {...msg} />}
    </>
  )
}

export default App
