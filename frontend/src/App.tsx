import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Expenses from "./pages/Expenses"
import Layout from "./layout/Layout"
import Analysis from "./pages/Analysis"
import Savings from "./pages/Savings"
import Record from "./pages/Record"
import Profile from "./pages/Profile"
import Categories from "./pages/Categories"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/expenses' element={<Layout><Expenses /></Layout>}></Route>
      <Route path='/analysis' element={<Layout><Analysis></Analysis></Layout>}></Route>
      <Route path='/savings' element={<Layout><Savings></Savings></Layout>}></Route>
      <Route path='/profile' element={<Layout><Profile></Profile></Layout>}></Route>
      <Route path='/record' element={<Record />}></Route>
      <Route path='/categories' element={<Categories />}></Route>
    </Routes>
  )
}

export default App