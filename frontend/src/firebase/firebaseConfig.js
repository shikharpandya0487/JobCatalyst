import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWcuigsIFxoGv6cqtedhgoUgP9_Q3IxVk",
  authDomain: "job-seeker-ebb5a.firebaseapp.com",
  projectId: "job-seeker-ebb5a",
  storageBucket: "job-seeker-ebb5a.appspot.com",
  messagingSenderId: "220753574022",
  appId: "1:220753574022:web:d0e64f7eb3110d5980b907"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)

export default app