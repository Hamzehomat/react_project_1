import { Navigate, } from 'react-router-dom'
export default function Protected({children}) {
    const token = localStorage.getItem('usertoken')
    if(!token){
        return(
        <>
         <div className='protected'> Please log in to view this content.</div>
         <Navigate to="/home" replace/>
        </>
        )
    }
    return children
}
