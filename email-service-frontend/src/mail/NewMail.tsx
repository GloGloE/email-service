import {ReactElement, useState} from "react";
import {MailForm} from "./MailForm";
import {baseURL, Email} from "../util/external";
import "bootstrap/dist/css/bootstrap.min.css"
import {Toast, ToastBody} from "react-bootstrap";

export function NewMail(): ReactElement {

    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showFail, setShowFail] = useState<boolean>(false);

    const handleSubmit = async (data: Email) => {
        await fetch(baseURL, {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => {
            response.json();
            if(response.ok) {
                setShowSuccess(true);
            } else {
                setShowFail(true);
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }


    return (
        <div>
            <Toast
                show={showSuccess}
                onClose={() => setShowSuccess(false)}
                bg="success"
                autohide={true}>
                <ToastBody className={'text-white'}>
                    Email sent successfully!
                </ToastBody>
            </Toast>
            <Toast
                show={showFail}
                onClose={() => setShowFail(false)}
                bg="warning"
                autohide={true}>
                <ToastBody className={'text-white'}>
                    Error sending email!
                </ToastBody>
            </Toast>
            <MailForm onSubmit={handleSubmit}/>
        </div>
    )
}