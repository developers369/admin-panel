import {LOGIN, UPDATE_PROFILE, ADD_USER, UPDATE_USER, DELETE_USER, DELETE_USERS, CHANGE_STATUS, FETCH_USERS} from './actionType'
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
            
            var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
            console.log(date);
            let stringId = ++ID
            const user = {
                ID: stringId.toString(),
                fullName: action.payload.fullName,
                email: action.payload.email,
                salary: action.payload.salary,
                contact: action.payload.contact,
                avatar: action.payload.avatar,
                status: true,
                createdDate: date
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
            const updateUser = {
                ID: action.payload.updateId,
                fullName: action.payload.fullName,
                email: action.payload.email,
                salary: action.payload.salary,
                contact: action.payload.contact,
                avatar: action.payload.avatar,
                status: state.users[ind].status,
                createdDate: state.users[ind].createdDate
            }
            //console.log("array=", state.users.splice(ind, 1, action.payload))
            let temp = state.users
            temp.splice(ind, 1, updateUser)
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


        case CHANGE_STATUS:

            let index

            state.users.map((user, ind) => {
                if(user.ID === action.payload){
                    index = ind
                }
                return{

                }
            })

            let tempA = [...state.users]
           

            if(tempA[index].status)
                tempA[index].status = false
            else
                tempA[index].status = true

            console.log("old",state.users);
            console.log("updated",tempA);
            console.log("state changed", tempA[index]);
            return{
                ...state,
                users: tempA
            }


        case FETCH_USERS:

            let users = JSON.parse(localStorage.getItem("users"))
            console.log(users)
            return{
                ...state,
                users
            }

        default : return state
    }
}