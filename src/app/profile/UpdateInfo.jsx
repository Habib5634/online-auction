import React from 'react'
import { IoCloseCircle } from 'react-icons/io5'

const UpdateInfo = () => {
  return (
    <div>
      <form action="" className='flex flex-col gap-5'>
        <div className='flex flex-col gap-3'>
          <label htmlFor="name" className='text-20 font-bold text-blackish'>Name</label>
            <input type="text" name="name" placeholder='Name' className='w-full max-w-xs py-2.5 px-4 focus:outline bg-transparent  ring-2 ring-purple rounded-md ' />

        </div>
        <div className='flex flex-col gap-3'>
          <label htmlFor="Contact" className='text-20 font-bold text-blackish'>Contact</label>
            <input type="text" name="contact" placeholder='+923....' className='w-full max-w-xs py-2.5 px-4 focus:outline bg-transparent  ring-2 ring-purple rounded-md ' />

        </div>
        <div className='flex flex-col gap-3'>
          <label htmlFor="age" className='text-20 font-bold text-blackish'>Age</label>
            <input type="text" name="age" placeholder='' className='w-full max-w-xs py-2.5 px-4 focus:outline bg-transparent  ring-2 ring-purple rounded-md ' />

        </div>
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
        
      </form>
    </div>
  )
}

export default UpdateInfo