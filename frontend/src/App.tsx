import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Expenses from "./pages/Expenses"
import Layout from "./layout/Layout"
import Analysis from "./pages/Analysis"
import Savings from "./pages/Savings"
import Tags from "./pages/Tags"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/expenses' element={<Layout><Expenses /></Layout>}></Route>
      <Route path='/analysis' element={<Layout><Analysis></Analysis></Layout>}></Route>
      <Route path='/savings' element={<Layout><Savings></Savings></Layout>}></Route>
      <Route path='/tags' element={<Layout><Tags></Tags></Layout>}></Route>

    </Routes>
  )
}

export default App