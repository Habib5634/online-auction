import { fetchUserData } from '@/Store/Actions/userActions';
import { API_URL, getAuthHeaders } from '@/utils/apiUrl';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5'
import { useDispatch } from 'react-redux';

const UpdateInfo = ({ user }) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.fullName || "",
    contact: user?.contact || "",
    // age: user?.age || "",
    // experience: user?.experience || "",
    // skills: user?.skills || [],
    // newSkill: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleOpenModel = ()=>{
    setIsModalOpen(true)

  }
  const handleCloseModel = ()=>{
    setIsModalOpen(false)
  }

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_URL }/auth/update/`, {
        fullName: userData.name,
        contact: userData.contact,
        // age: userData.age,
        // experience: userData.experience,
        // skills: userData.skills,
      }, getAuthHeaders());
      toast.success(response.data.message);
      await dispatch(fetchUserData())
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <form action="" className='flex flex-col gap-5'>
        <div className='flex flex-col gap-3'>
          <label htmlFor="name" className='text-20 font-bold text-blackish'>Name</label>
          <input
            type="text"
            name="name"
            value={userData?.name}
            onChange={handleInputChange}
            placeholder='Name'
            className='w-full max-w-xs py-2.5 px-4 focus:outline bg-transparent  ring-2 ring-purple rounded-md ' />

        </div>
        <div className='flex flex-col gap-3'>
          <label htmlFor="Contact" className='text-20 font-bold text-blackish'>Contact</label>
          <input
            type="text"
            name="contact"
            value={userData?.contact}
            onChange={handleInputChange}
            placeholder='+923....'
            className='w-full max-w-xs py-2.5 px-4 focus:outline bg-transparent  ring-2 ring-purple rounded-md ' />

        </div>
        {/* <div className='flex flex-col gap-3'>
          <label htmlFor="age" className='text-20 font-bold text-blackish'>Age</label>
            <input type="text" name="age" placeholder='' className='w-full max-w-xs py-2.5 px-4 focus:outline bg-transparent  ring-2 ring-purple rounded-md ' />

        </div> */}
        {/* <div className='flex flex-col gap-3'>
          <label htmlFor="experience" className='text-20 font-bold text-blackish'>Experience</label>
            <input type="text" name="experience" placeholder='experience' className='w-full max-w-xs py-2.5 px-4 focus:outline bg-transparent  ring-2 ring-purple rounded-md ' />

        </div>
        <div className='flex flex-col gap-3'>
          <label htmlFor="" className='text-20 font-bold text-blackish'>Skills</label>
            <div className='flex gap-2'>

            <input type="text" name="" placeholder='' className='w-full max-w-xs py-2.5 px-4 focus:outline bg-transparent  ring-2 ring-purple rounded-md ' />
<button className='py-2.5 px-3 w-fit bg-purple text-white rpunded-md'>Add</button>
            </div>
        </div>
        <div className='text-20 font-semibold  w-1/2 text-start flex items-center flex-wrap gap-2 '>
      <h1 className='pl-4 py-1.5 bg-purple rounded-md text-white w-fit flex gap-1 items-center' >ReactJs <IoCloseCircle className='text-red mx-4' size={20} /></h1>
            <h1 className='pl-4 py-1.5 bg-purple rounded-md text-white w-fit flex gap-1 items-center' >NextJs<IoCloseCircle className='text-red mx-4' size={20} /></h1>
            <h1 className='pl-4 py-1.5 bg-purple rounded-md text-white w-fit flex gap-1 items-center' >ExpressJs<IoCloseCircle className='text-red mx-4' size={20} /></h1>
            <h1 className='pl-4 py-1.5 bg-purple rounded-md text-white w-fit flex gap-1 items-center' >NodeJs<IoCloseCircle className='text-red mx-4' size={20} /></h1>
            <h1 className='pl-4 py-1.5 bg-purple rounded-md text-white w-fit flex gap-1 items-center' >MongoDb<IoCloseCircle className='text-red mx-4' size={20} /></h1>
            <h1 className='pl-4 py-1.5 bg-purple rounded-md text-white w-fit flex gap-1 items-center' >Python<IoCloseCircle className='text-red mx-4' size={20} /></h1>
            </div> */}
        <button
          type="button"
          onClick={handleUpdate}
          className="mt-5 py-2 px-4 bg-green text-white rounded-md"
        >
          Update Info
        </button>
      </form>
      <button
          type="button"
          onClick={handleOpenModel}
          className="mt-5 py-2 px-4 bg-purpledark text-white rounded-md"
        >
          Update Password
        </button>
        {isModalOpen && 
        <UpdatePasswordModel closeModal={handleCloseModel}/>
        }
    </div>
  )
}

export default UpdateInfo



const UpdatePasswordModel = ({ closeModal }) => {
  // State for form inputs
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // State for loading
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/updatePassword/`, formData,getAuthHeaders());
      console.log(response)
      if (response.data.success === true) {
        toast.success(response.data.message || "Password updated successfully!");
        closeModal(); // Close modal after successful update
      } else {
        toast.error(response.data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "An error occurred while updating the password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative">
        <h3 className="text-xl font-bold mb-4">Update Password</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your old password"
            />
          </div>
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your new password"
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blackish text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="ml-4 px-6 py-2 bg-red text-white rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
        {/* Close Icon */}
        <IoMdCloseCircleOutline
          onClick={closeModal}
          size={25}
          className="absolute top-6 right-6 text-black cursor-pointer"
        />
      </div>
    </div>
  );
};