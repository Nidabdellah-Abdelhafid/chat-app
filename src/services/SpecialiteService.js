import axios from 'axios';
const Specialite_API_BASE_URL="http://localhost:2026/Vill_Zone/specialite/allSpecialite";

class SpecialiteService {

    getSpecialite(){
        return axios.get(Specialite_API_BASE_URL);
    }
    addSpecialite(specialite){
        return  axios.post(`http://localhost:2026/Vill_Zone/specialite/addSpecialite`,specialite);
    }
    getSpecialiteById(specialite_id){
        return axios.get("http://localhost:2026/Vill_Zone/specialite/"+specialite_id);
    }
    updateSpecialite(specialite_id,specialite){
        return  axios.put(`http://localhost:2026/Vill_Zone/updateSpecialite/`+specialite_id,specialite);
    }
    deleteSpecialite(specialite_id){
        return  axios.delete("http://localhost:2026/Vill_Zone/deleteSpecialite/"+specialite_id);
    }


}
export default new SpecialiteService();