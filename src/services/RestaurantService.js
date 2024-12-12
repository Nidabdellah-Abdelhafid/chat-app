import axios from 'axios';
const HOUSE_API_BASE_URL="http://localhost:2026/Vill_Zone/restaurant/allrestaurant";
class RestaurantService{
    getRestaurant(){
        return axios.get(HOUSE_API_BASE_URL);
    }
    getRestaurantById(Restaurant_id){
        return axios.get("http://localhost:2026/Vill_Zone/restaurant/"+Restaurant_id);
    }
    updateRestaurantEtat(restaurant_id,restaurant){
        return  axios.put("http://localhost:2026/Vill_Zone/restaurant/changeEtat/"+restaurant_id,restaurant);
    }
}

export default new RestaurantService()