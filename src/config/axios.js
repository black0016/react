import axios from "axios";

const clienteAxios = axios.create({
    baseURL: "http://localhost:5004",
});

export default clienteAxios;