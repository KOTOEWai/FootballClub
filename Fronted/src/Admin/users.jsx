import { useState,useEffect } from "react";
import axios from "axios";
const Users = () => {

    const [users, setUsers] = useState([]);
    // Fetch user information
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:3000/user/get/all");
          if (response.status === 200) {
            setUsers(response.data);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
  
      fetchUsers();
    }, []);

  const   handleDelete = async (id)=>{
    console.log(id)

   const res = await axios.delete(`http://localhost:3000/user/delete/${id}`);
   if(res.status === 200){
  
     alert('User deleted successfully');
     setUsers(users.filter(user => user.id !== id));
     window.location.reload();
     } else {
        alert('Error deleting user');
     }
   
  }

  return (
    <div className=" ">
       <div className="p-6 bg-gray-100 ">
      <h1 className="text-2xl font-semibold mb-4">User Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Profile</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={`http://localhost:3000/uploads/${user.profile_img[0]}`}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.role}</td>
                  <td className="px-6 py-4 text-gray-700 ">
                    <div className="flex gap-3">
                  
                    <button className="bg-green-300 px-8 rounded-lg">View</button>
                    <button onClick={()=>handleDelete(user._id)} className="bg-red-500 text-white p-3 px-8 rounded-md">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-6 py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Users
