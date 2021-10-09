import axios from 'axios';

const IDEA_URL = "http://localhost:8080/idea/"

class IdeaService {
    getIdea = () =>{
       return axios.get(IDEA_URL)
    };
    postIdea = (object) =>{
        return axios.post(IDEA_URL, object)
    };
    patchIdea = (object) =>{
        return axios.patch(IDEA_URL, object)
    };
    deleteIdea = (id) =>{
        return axios.delete(IDEA_URL + id)
    };
}

export default new IdeaService();