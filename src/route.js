import React from 'react';

const DashboardContent = React.lazy(() => import("./Components/DashboardContent"))
const Profile = React.lazy(() => import("./Components/Profile"))
const AddUpdate = React.lazy(() => import("./Components/AddUpdate"))
const Users = React.lazy(() => import("./Components/Users"))

const route = [
    { path: "/dashboard/dashboard-content", exact:true, component: DashboardContent},
    { path: "/dashboard/dashboard-content/profile", exact: false ,component: Profile},
    { path: "/dashboard/dashboard-content/users", exact: false ,component: Users},
    { path: "/dashboard/dashboard-content/action/:id?",exact: false , component: AddUpdate}
]

export default route