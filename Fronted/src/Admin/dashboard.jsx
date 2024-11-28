import { Link } from 'react-router-dom';
export default function dashboard() {
  return (


<div className=" ">
       
 <div className=" grid grid-cols-2 gap-3 justify-center items-center mt-24 container mx-auto  ">

 <Link to="/admin/players" className=" bg-slate-300 rounded-lg p-5 h-40 flex justify-center items-center ">
 <h1 className="text-2xl text-center ">Players  Management</h1>
 </Link>

  <Link to='/admin/matches' className=" bg-slate-300 rounded-lg p-5 h-40 flex justify-center items-center ">
    <h1 className="text-2xl text-center">Match  Management</h1>
    </Link>
    <Link to='/admin/tickets' className=" bg-slate-300 rounded-lg p-5 h-40 flex justify-center items-center ">
    <h1 className="text-2xl text-center">Ticket  Management</h1>
     </Link>
     <Link to={'/admin/users'} className=" bg-slate-300 rounded-lg p-5 h-40 flex justify-center items-center ">
    <h1 className="text-2xl text-center">User  Management</h1>
     </Link>

       </div>
    </div>
  )
}
