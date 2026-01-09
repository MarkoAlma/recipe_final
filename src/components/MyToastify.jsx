import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { MyUserContext } from '../context/MyUserProvider'
import { useNavigate } from 'react-router'

const MyToastify = ({err, katt, resetPw, serverMsg}) => {

    const {setMsg} = useContext(MyUserContext)
    const navigate = useNavigate()

    useEffect(()=>{

        if (err || serverMsg) {
            toast.error(err, {position:'top-center'})
            setMsg({})
        }else if (katt) {
            navigate('/signin')
            let alma = katt
            toast.success(alma, {position:'top-center'})
            //setMsg(prev => delete prev.katt)
            //setMsg({})
            // setTimeout(()=> {
            //     navigate('/signin')
            //     setMsg({})
            // }, 2000)
        }else if (resetPw) {
            navigate('/signin')
            toast.success(resetPw, {position:'top-center'})
        }
    },[err, katt, resetPw])

  return (
    <div>
      <ToastContainer/>
    </div>
  )
}

export default MyToastify
