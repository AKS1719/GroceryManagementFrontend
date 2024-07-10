import React, { useEffect, useState } from "react"
import {Footer, Header} from './components/index.js'
import authService from "./Services/authService.js"
import {useDispatch} from 'react-redux'
import {login, logout} from './store/authSlice.js'
import {Outlet} from 'react-router-dom'
import axios from "axios"
import conf from "./envConf/conf.js"
function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  async function fetchCurrentUser(){
    await axios.get(`${conf.backendUserUrl}/currentUser`)
  .then((userData) => {
    if (userData) {
      dispatch(login({userData}));
    }
    else{
      console.log("logging out...")
      dispatch(logout())
    }
  })
  .finally(()=>setLoading(false));
}
  useEffect(() => {
    fetchCurrentUser()
    // ( async()=>{
    //   const a = await axios.get(`${conf.backendUserUrl}/madhar`);
    //   console.log(a)
    // })()
  }, [])
  

  return  !loading ? (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header/>
          <main>
            <Outlet/>
          </main>
          <Footer/>
        </div>
      </div>
    </>
  ): null
}

export default App
