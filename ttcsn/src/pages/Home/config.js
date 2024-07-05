
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyBzLB3seWmUALjUFpdbtENmcObFk7Hdhqg",
  authDomain: "imageuploaddb-2d968.firebaseapp.com",
  projectId: "imageuploaddb-2d968",
  storageBucket: "imageuploaddb-2d968.appspot.com",
  messagingSenderId: "812719688248",
  appId: "1:812719688248:web:0c83af2051a2cc341fb4cd"
};


const app = initializeApp(firebaseConfig);
export const imageDb=getStorage(app);