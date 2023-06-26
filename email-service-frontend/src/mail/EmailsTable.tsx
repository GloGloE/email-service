import {ReactElement, useEffect, useState} from "react";
import {baseURL, Columns, Email} from "../util/external";

export function EmailsTable(): ReactElement {

    const [emails, setEmails] = useState<Email[]>([]);

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
    )
}