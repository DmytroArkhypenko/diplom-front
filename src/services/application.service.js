import axios from "axios";

const API_URL = "http://localhost:8080/api/application/";

const sendApplication = (name, degree, position, place, type, phone, email, theme) => {
  return axios
    .post(API_URL + "post", {
      name, degree, position, place, type, phone, email, theme
    });
}

export default {
  sendApplication
};