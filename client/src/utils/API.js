import axios from "axios";

export default {
  // Gets all books
  getUser: function() {
    return axios.get("/user/");
  },

  saveUser: function(userData) {
    return axios.post("/user/", userData);
  },
  checkUser: function(userData) {
    return axios.post("/user/login", userData);
  },
};
