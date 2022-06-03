import React from 'react'
import { Link, Outlet } from 'react-router-dom'
const Admin = ({children}) => {
  return (
   <div style={{display:"flex"}}>
<aside class="w-64" aria-label="Sidebar">
<div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
<ul class="space-y-2">
<li>
<Link to={`dashboard`} class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
<span class="ml-3">Dashboard</span>
</Link>
</li>
<li>
<Link to={`employee`} class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
<span class="flex-1 ml-3 whitespace-nowrap">Employee</span>
</Link>
</li>
<li>
<Link to={`employer`} class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
<span class="flex-1 ml-3 whitespace-nowrap">Employer</span>
</Link>
</li>

</ul>
</div>
</aside>
<div>
<Outlet />
</div>
</div>

  )
}

export default Admin