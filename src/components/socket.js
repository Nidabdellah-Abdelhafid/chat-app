// import { useEffect } from 'react';
import io from 'socket.io-client';
const URL_BACKEND = 'http://192.168.11.106:1337';


const socket = io(URL_BACKEND, {
  transports: ['websocket'],
  jsonp: false,
});


export default socket;