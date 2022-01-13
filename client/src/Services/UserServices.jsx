import axios from 'axios';
 
const URL = "http://localhost:8080/user/"
 
class UserService {
    getUser = () =>{
       return axios.get(URL)
    };
    getUserById = (id) =>{
        return axios.get(URL + id)
    }
    postUser = (object) =>{
        return axios.post(URL, object)
    };
    patchUser = (object) =>{
        return axios.patch(URL, object)
    };
    deleteUser = (id) =>{
        return axios.delete(URL + id)
    };
}
 
export default new UserService();

