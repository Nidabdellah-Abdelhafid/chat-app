import axios from 'axios';
const Ville_API_BASE_URL="http://localhost:2026/Vill_Zone/ville/allVille";

class VilleService {

    getVille(){
        return axios.get(Ville_API_BASE_URL);
    }
    addVille(ville){
        return  axios.post(`http://localhost:2026/Vill_Zone/ville/addVille`,ville);
    }
    getVilleById(ville_id){
        return axios.get("http://localhost:2026/Vill_Zone/ville/"+ville_id);
    }
    updateVille(ville_id,ville){
        return  axios.put(`http://localhost:2026/Vill_Zone/updateVille/`+ville_id,ville);
    }
    deleteVille(ville_id){
        return  axios.delete("http://localhost:2026/Vill_Zone/deleteVille/"+ville_id);
    }


}
export default new VilleService();