import axios from "axios";

const instance = axios.create({
  baseURL: 'https://react-my-burger-ab5a2-default-rtdb.firebaseio.com/'
})

export default instance;
