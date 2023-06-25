import {ReactElement, useEffect, useState} from "react";
import {baseURL, Columns, Email} from "../util/external";
import axios from "axios";

export function Emails(): ReactElement {

    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getAllEmail();
    }, [])

    const getAllEmail = () => {
        fetch(baseURL)
            .then((response) => response.json())
            .then((data) => {
                setEmails(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <div className="w-50">
            <h1>Emails</h1>
            {emails.length > 0 &&
                <table className="table">
                    <thead>
                        <tr>
                            {Columns.map((c) => {
                                return (<th key={c.accessor}>{c.Header}</th>)
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
                                    <td>{val.cc}</td>
                                    <td>{val.subject}</td>
                                    <td>{val.importance}</td>
                                    <td>{val.content}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}