import http from "../commonHttp";
import {Email} from "../util/external";
import axios from "axios";

let cancelToken = axios.CancelToken.source();

const getAll = () => {
    return http.get<Email[]>("/", {cancelToken: cancelToken.token});
};

const save = (data: Email) => {
    return http.post<Email>("/", data, {cancelToken: cancelToken.token});
}

const abortAll = () => {
    console.log("!!EmailsService abortAll!!")
    cancelToken.cancel("Axios request aborted");
    cancelToken = axios.CancelToken.source();
}

const EmailService = {
    getAll,
    save,
    abortAll
};

export default EmailService;