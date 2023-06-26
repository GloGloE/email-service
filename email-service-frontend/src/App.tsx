import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {Link, Navigate, Route, Routes} from "react-router-dom";
import {Button, Container, Nav, Tab} from "react-bootstrap";
import {NewMail} from "./mail/NewMail";
import {Emails} from "./mail/Emails";

function App() {
    return (
        <Container className="float-start">
            <Tab.Container>
            <Nav>
                <Link to="/new">New Mail</Link>
                <Link to="/emails">Emails</Link>
            </Nav>
            </Tab.Container>
                <Routes>
                    <Route
                        path="/new"
                        element={<NewMail/>}

                    />
                    <Route
                        path="/emails"
                        element={<Emails/>}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/new"/>}
                    />
                </Routes>
        </Container>
    )
}

export default App;
