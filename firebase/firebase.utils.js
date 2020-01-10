import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyCzfsOkoiaRHeRsDITuk_pgDl__fPm6HMw",
    authDomain: "crwn-db-91f16.firebaseapp.com",
    databaseURL: "https://crwn-db-91f16.firebaseio.com",
    projectId: "crwn-db-91f16",
    storageBucket: "crwn-db-91f16.appspot.com",
    messagingSenderId: "731283357280",
    appId: "1:731283357280:web:f0dc2321c2dac1fef74d05",
    measurementId: "G-J2JWDTDPQR"
  };


  export const createUserProfileDocument=async(userAuth,additionalData)=>{
    if(!userAuth)  return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
   const snapShot=await userRef.get();
   if(!snapShot.exists){
     const {displayName,email}=userAuth;
     const createdAt= new Date();

     try{
       await userRef.set({
         displayName,
         email,
         createdAt,
         ...additionalData
       })
     }catch(error){
       console.log('error creating user',error.message);
     }
   }
   return userRef;
  console.log(firestore.doc('users/124gvegvgb'));
   
    console.log(snapShot)
  };

  firebase.initializeApp(config);

  export const auth=firebase.auth();
  export const firestore=firebase.firestore();
  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle=()=>auth.signInWithPopup(provider);

  export default firebase;
