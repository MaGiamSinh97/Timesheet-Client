import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44355/api",
  headers: {
    "Content-type": "application/json"
  }
});