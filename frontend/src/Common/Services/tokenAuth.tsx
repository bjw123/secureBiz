
import {adminAPI,publicAPI} from "./API"

export const tokenAuth  = async () => {
  
    let validation;
    // CHECK LOCAL STORAGE
  //  if (localStorage.getItem("token")) {
   //   validation = await adminAPI(localStorage.getItem("token")); 
  //  }  
    // CHECK SESSION STORAGE
 //   else if (sessionStorage.getItem("token"))
  ///  {
   //   validation = await adminAPI(sessionStorage.getItem("token"));
  //  }
    // SHOW LOGIN MODAL
   // else {
      validation = false;
 //     
 //   }
    console.log("validation",validation)
    return validation;
  };