import axios from 'axios';
const Zone_API_BASE_URL="http://localhost:2026/Vill_Zone/zone/allzone";

class ZoneService {

    getZone(){
        return axios.get(Zone_API_BASE_URL);
    }
    addZone(ville_id,zone){
        return  axios.post(`http://localhost:2026/Vill_Zone/ville/${ville_id}/addZone`,zone);
    }
    getZoneById(zone_id){
        return axios.get("http://localhost:2026/Vill_Zone/zone/"+zone_id);
    }
    updateZone(ville_id,zone_id,zone){
        return  axios.put(`http://localhost:2026/Vill_Zone/ville/${ville_id}/updateZone/`+zone_id,zone);
    }
    deleteZone(zone_id){
        return  axios.delete("http://localhost:2026/Vill_Zone/zone/deleteZone/"+zone_id);
    }


}
export default new ZoneService();