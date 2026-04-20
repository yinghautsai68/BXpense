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
import RecordForm from "./pages/RecordForm"
import AccountForm from "./pages/AccountForm"
import DetailLayout from "./layout/DetailLayout"
import EditProfile from "./pages/EditProfile"
import ProtectedRoute from "./components/ProtectedRoute"



const App = () => {
  return (
    <>
      <Toaster></Toaster>
      <Routes>
        <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/records' element={<Records />}></Route>
          <Route path='/records/new' element={<RecordForm />}></Route>
          <Route path='/records/:id' element={<DetailLayout title="檢視紀錄"><Record /></DetailLayout>}></Route>
          <Route path='/records/:id/edit' element={<RecordForm />}></Route>

          <Route path='/analysis' element={<Analysis></Analysis>}></Route>

          <Route path='/accounts' element={<Layout title="帳戶"><Accounts /> </Layout>}></Route>
          <Route path='/accounts/new' element={<DetailLayout title="新增帳戶"><AccountForm /></DetailLayout>}></Route>
          <Route path='/accounts/:id' element={<DetailLayout title="帳戶"><Account /></DetailLayout>}></Route>
          <Route path='/accounts/:id/edit' element={<DetailLayout title="更新帳戶"><AccountForm /></DetailLayout>}></Route>

          <Route path='/profile' element={<Layout title="使用者"><Profile></Profile></Layout>}></Route>
          <Route path="/profile/edit" element={<Layout title="編輯使用者"><EditProfile /></Layout>} />

          <Route path='/categories' element={<Categories />}></Route>
          <Route path='/categories/:id/edit' element={<Categories />}></Route>
        </Route>
      </Routes>
    </>

  )
}

export default App