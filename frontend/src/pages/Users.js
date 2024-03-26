import React from 'react'
import { useAuth } from '../contexts/AuthContext';

const Users = () => {
  const { isAuthenticated } = useAuth();
	console.log(isAuthenticated);

  return (
    <div>Users</div>
  )
}

export default Users