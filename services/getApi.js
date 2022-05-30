import axios from "axios";
// import {baseUrl} from "../redux/constants/url";
// import swal from "sweetalert";
// Make a post api where we can call it and hold the data in another variable

export const getDataFromApi = (data) => {
        // console.log("The data is ",data);
        // return async (dispatch) => {
        //     // Console the data getting from the form of create admin
        //     try {
        //         axios(data)
        //             .then(function(response) {
        //                 //Printing the response of the data
        //                 console.log(("Response is  :::", response));
        //                 // console.log(("The response code is ::", response.status));

        //                 if(response.status === 208) {
        //                     swal({
        //                         title: "this fees structure already created",
        //                         icon: "info",
        //                     });
        //                 } else if(response.status === 200) {
        //                     swal({
        //                         title: "fees structure created successfully",
        //                         icon: "success",
        //                     });
        //                 }
        //             })
        //             .catch(function(error) {
        //                 console.log("error",error);
        //                 swal({
        //                     title: "Request failed",
        //                     icon: "error",
        //                 });
        //             });
        //     } catch(error) {
        //         console.log(error);
        //     }
        // };
    
    axios(data)
        .then(function(response) {
            console.log(response.data);
            // localStorage.setItem("AdminInfo",(JSON.stringify(response.data)))
        })
        .catch(function(error) {
            console.log(error);
        });
    }

