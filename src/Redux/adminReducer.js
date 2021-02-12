import {LOGIN, UPDATE_PROFILE, ADD_USER, UPDATE_USER, DELETE_USER, DELETE_USERS} from './actionType'
import profileImg from '../Image/download.png'

let ID = 0

const intialState = {
    admin : {
        fullName: "Harshal Patil",
        email: "harshal@gmail.com",
        userName: "admin",
        password: "admin123",
        profileImg
    },
    success: "",
    users: [],
}

export const adminReducer = (state = intialState, action) => {

    switch(action.type){

        case LOGIN:
            let flag = false
            if(state.admin.userName === action.payload.userName && state.admin.password === action.payload.password){
                console.log("Login Successful")
                flag = true
            }else{
                console.log("Login UnSuccessful")
                flag = false
                // console.log(state.success);
            }

            console.log(flag);
            return{
                ...state,
                success: state.admin.userName === action.payload.userName && state.admin.password === action.payload.password ? true : false
            }


        case UPDATE_PROFILE:
            return{
                ...state,
                admin:{
                    ...state.admin,
                    fullName: action.payload.fullName,
                    email: action.payload.email,
                    profileImg: action.payload.profileImg,

                }
            }


        case ADD_USER:
           
            let stringId = ++ID
            const user = {
                ID: stringId.toString(),
                fullName: action.payload.fullName,
                email: action.payload.email,
                salary: action.payload.salary,
                contact: action.payload.contact
            }
            
            return{
                ...state,
                users: [...state.users, user]
            }

        case UPDATE_USER:
            let ind

            state.users.map((user, index) => {
                if(user.ID === action.payload.updateId){
                    ind = index
                }
                return{

                }
            })

            console.log("index=", ind)
            //console.log("array=", state.users.splice(ind, 1, action.payload))
            let temp = state.users
            temp.splice(ind, 1, action.payload)
            return{
               ...state,
               users: temp
            }
        

        case DELETE_USER:
            console.log(action.payload);
            return{
                ...state,
                users: state.users.filter(user => user.ID !== action.payload)
            }

        case DELETE_USERS:
            console.log(action.payload);

            let tempArray = state.users
            console.log("Hello");
            for(var i=0; i<action.payload.length; i++){
                
                let index = tempArray.indexOf(action.payload[i])

                tempArray.splice(index, 1)
            }
            return{
                ...state,
                users: tempArray
            }

        default : return state
    }
}