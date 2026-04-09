import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Records from "./pages/Records"
import Record from "./pages/Record"
import Layout from "./layout/Layout"
import Analysis from "./pages/Analysis"
import Accounts from "./pages/Accounts"
import Account from "./pages/Account"
import Profile from "./pages/Profile"
import Categories from "./pages/Categories"
import { Toaster } from "react-hot-toast"

import Add from "./pages/Add"



const App = () => {
  return (
    <>
      <Toaster></Toaster>
      <Routes>
        <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/records' element={<Layout><Records /></Layout>}></Route>
        <Route path='/records/:id' element={<Record />}></Route>
        <Route path='/analysis' element={<Layout><Analysis></Analysis></Layout>}></Route>
        <Route path='/accounts/:id' element={<Account />}></Route>
        <Route path='/accounts' element={<Layout><Accounts /> </Layout>}></Route>
        <Route path='/profile' element={<Layout><Profile></Profile></Layout>}></Route>
        <Route path='/add' element={<Add />}></Route>
        <Route path='/categories' element={<Categories />}></Route>
      </Routes>
    </>

  )
}

export default App