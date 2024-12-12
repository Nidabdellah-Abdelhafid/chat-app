import axios from 'axios';
const Serie_API_BASE_URL="http://localhost:2026/Vill_Zone/serie/allSerie";

class SerieService {

    getSerie(){
        return axios.get(Serie_API_BASE_URL);
    }
    addSerie(serie){
        return  axios.post(`http://localhost:2026/Vill_Zone/serie/addSerie`,serie);
    }
    getSerieById(serie_id){
        return axios.get("http://localhost:2026/Vill_Zone/serie/"+serie_id);
    }
    updateSerie(serie_id,serie){
        return  axios.put(`http://localhost:2026/Vill_Zone/updateSerie/`+serie_id,serie);
    }
    deleteSerie(serie_id){
        return  axios.delete("http://localhost:2026/Vill_Zone/deleteSerie/"+serie_id);
    }


}
export default new SerieService();