import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (email, password, place, name, degree, phone) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
    place,
    name,
    degree,
    phone
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const resetpassword = (email) => {
  return axios
    .post(API_URL + "resetpassword", {
      email
    });
}

const newpassword = (password, token) => {
  return axios
    .post(API_URL + "newpassword", {
      password,
      token
    });
}

const updateuser = (email, password, place, name, degree, phone, username) => {
  return axios
    .post(API_URL + "updateuser", {
      email,
      password,
      place,
      name,
      degree,
      phone,
      username
    });
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  resetpassword,
  newpassword,
  updateuser,
};
