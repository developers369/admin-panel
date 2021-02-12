import {LOGIN, UPDATE_PROFILE, ADD_USER, UPDATE_USER, DELETE_USER, DELETE_USERS} from './actionType'

export function login(userName, password){
    // console.log(userName);
    return{
        type: LOGIN,
        payload: {
            userName,
            password
        }
    }
}

export function updateProfile(fullName, email, profileImg){
    // console.log(userName);
    return{
        type: UPDATE_PROFILE,
        payload: {
            fullName,
            email,
            profileImg
        }
    }
}


export function addUser(fullName, salary, email, contact){
   
    return{
        type: ADD_USER,
        payload: {
            fullName,
            salary,
            email,
            contact
        }
    }
}


export function updateUser(updateId, fullName, salary, email, contact){
    
    return{
        type: UPDATE_USER,
        payload: {
            updateId,
            fullName,
            salary,
            email,
            contact
        }
    }
}

export function deleteUser(deleteId){
    // console.log(deleteId);
    return{
        type: DELETE_USER,
        payload: deleteId
    }
}

export function deleteUsers(deletedIdArray){
    // console.log(deleteId);
    return{
        type: DELETE_USERS,
        payload: deletedIdArray
    }
}

