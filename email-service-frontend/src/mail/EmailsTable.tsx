import {ReactElement, useEffect, useRef, useState} from "react";
import {Columns, Email} from "../util/external";
import EmailService from "../services/EmailService";
import {Toast, ToastBody} from "react-bootstrap";

export function EmailsTable(): ReactElement {

    const [emails, setEmails] = useState<Email[]>([]);
    const [showFail, setShowFail] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const errorMessage = useRef<string>("");

    useEffect(() => {
        console.log("!!Emails useEffect!!")
        if(loading) {
            console.log("!!Aborting!!")
            EmailService.abortAll();
        }
        else {
            console.log("!!Not Aborting!!")
            getAllEmail();
        }
        return () => {
            console.log("!!Emails cleanup!!")
            EmailService.abortAll();
        }
    }, [])

    const getAllEmail = () => {
        setLoading(true);
        errorMessage.current = "";
        EmailService.getAll()
            .then((response) => {
                setEmails(response.data);
            })
            .catch((err: Error) => {
                errorMessage.current = 'Error retrieving email: ' + err.message;
                setShowFail(true);
            })
            .finally(() => {
                setLoading(false)
            });
    }

    return (
        <div>
            <Toast
                show={showFail}
                onClose={() => setShowFail(false)}
                bg="warning"
                autohide={true}>
                <ToastBody className={'text-white'}>
                    {errorMessage.current}
                </ToastBody>
            </Toast>
            <div className="card my-5">
                {emails.length > 0 &&
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    {Columns.map((c) => {
                                        return (<th scope="col" key={c.accessor}>{c.Header}</th>)
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {emails.map((val, key) => {
                                    console.log(val);
                                    return (
                                        <tr key={key}>
                                            <td>{val.to}</td>
                                            <td>{val.from}</td>
                                            <td>{val.cc?.join("; ")}</td>
                                            <td>{val.subject}</td>
                                            <td>{val.importance}</td>
                                            <td>{val.content}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}