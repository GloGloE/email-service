import axios from "axios";
import {baseURL} from "./util/external";

export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json"
    }
});
