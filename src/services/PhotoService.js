import axios from 'axios';
const Photo_API_BASE_URL="http://localhost:2026/Vill_Zone/photo/allPhoto";

class PhotoService {

    getPhoto(){
        return axios.get(Photo_API_BASE_URL);
    }
    addPhoto(restaurant_id,photo){
        return  axios.post(`http://localhost:2026/Vill_Zone/restaurant/${restaurant_id}/addPhoto`,photo);
    }
    getphotoById(photo_id){
        return axios.get("http://localhost:2026/Vill_Zone/photo/"+photo_id);
    }
    getRestaurantPhotoById(restaurant_id){
        return axios.get("http://localhost:2026/Vill_Zone/findPhotoResrById/"+restaurant_id);
    }
    getRestaurantPhotoPT(){
        return axios.get("http://localhost:2026/Vill_Zone/findPhotoResrPT");
    }
    updatePhoto(restaurant_id,photo_id,photo){
        return  axios.put(`http://localhost:2026/Vill_Zone/restaurant/${restaurant_id}/updatePhoto/`+photo_id,photo);
    }
    deletePhoto(photo_id){
        return  axios.delete("http://localhost:2026/Vill_Zone/photo/deletePhoto/"+photo_id);
    }


}
export default new PhotoService();