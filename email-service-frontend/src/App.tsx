import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {Navigate, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import {NewMail} from "./mail/NewMail";
import {Emails} from "./mail/Emails";

function App() {
    return (
        <Container className="float-start">
            <Routes>
                <Route
                    path="/"
                    element={<NewMail/>}
                />
                <Route
                    path="/history"
                    element={<Emails/>}
                />
                <Route
                    path="*"
                    element={<Navigate to="/"/>}
                />
            </Routes>
        </Container>
    )
}

export default App;
