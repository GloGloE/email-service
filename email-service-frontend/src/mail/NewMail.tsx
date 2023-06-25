import {ReactElement} from "react";
import {MailForm} from "./MailForm";
import {baseURL, Email} from "../util/external";
import "bootstrap/dist/css/bootstrap.min.css"

export function NewMail(): ReactElement {

    const handleSubmit = async (data: Email) => {
        await fetch(baseURL, {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => response.json())
        .catch((err) => {
                console.log(err.message);
        });
    }

    return (
        <div className="w-50">
            <h1>New Mail</h1>
            <MailForm onSubmit={handleSubmit}/>
        </div>
    )
}