import http from "../commonHttp";
import {Email} from "../util/external";

const getAll = () => {
    return http.get<Email[]>("/");
};

const save = (data: Email) => {
    return http.post<Email>("/", data);
}

const EmailService = {
    getAll,
    save
};

export default EmailService;