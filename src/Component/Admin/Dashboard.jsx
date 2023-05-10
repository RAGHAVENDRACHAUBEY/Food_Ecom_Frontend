import React from 'react'
import AdminHeader from './AdminHeader'
import SidebarAdmin from './SidebarAdmin'

function Dashboard(props) {
  return (
   <>
   <div className='row me-0'>
    <div className='col-md-2 left-h '>
      <SidebarAdmin/></div>
   
    <div className='col-md-10 right-h '>
    
    {props.children}
    </div>
   
   </div>
   </>
  )
}

export default Dashboard