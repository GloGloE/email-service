import {ReactElement, useRef, useState} from "react";
import {MailForm} from "./MailForm";
import {Email} from "../util/external";
import "bootstrap/dist/css/bootstrap.min.css"
import {Toast, ToastBody} from "react-bootstrap";
import EmailService from "../services/EmailService";

export function NewMail(): ReactElement {

    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showFail, setShowFail] = useState<boolean>(false);
    const errorMessage = useRef<string>("");


    const handleSubmit = (data: Email) => {
        errorMessage.current = "";
        EmailService.save(data)
            .then(() => {
                setShowSuccess(true);
            })
            .catch((err: Error) => {
               errorMessage.current = 'Error sending email: ' + err.message;
               setShowFail(true);
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
                    {errorMessage.current}
                </ToastBody>
            </Toast>
            <MailForm onSubmit={handleSubmit}/>
        </div>
    )
}