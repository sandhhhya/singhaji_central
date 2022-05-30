import axios from "axios";

// Make a post api where we can call it and hold the data in another variable
async function getData(data, url) {
  try {
    var res = await axios.post(url, data);
    // console.log("The response of dat is :: ", res);
    if (res.status === 200) {
      //here i change the return data so the response object coming from an api is directly return
      return res;
    }
    // Don't forget to return something
    return res;
  } catch (err) {
    return err;
  }
}

export default getData;
