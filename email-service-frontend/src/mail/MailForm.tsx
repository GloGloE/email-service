import {FormEvent, ReactElement, ReactNode, useRef, useState} from "react";
import {Button, Col, Form, Modal, Row, Stack} from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import {Email, Option} from "../util/external";

interface MailFormProps {
    onSubmit: (data: Email) => void
}

const options : Option[] = [
    { label: "LOW", value: "LOW" },
    { label: "NORMAL", value: "NORMAL" },
    { label: "HIGH", value: "HIGH" },
]

export function MailForm( {onSubmit}: MailFormProps ): ReactElement {

    const formRef = useRef<HTMLFormElement>(null);
    const toRef = useRef<HTMLInputElement>(null);
    const fromRef = useRef<HTMLInputElement>(null);
    const ccRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [selected, setSelected] = useState<Option>(options[0]);
    const [showModal, setShowModal] = useState<boolean>(false);

    const [validated, setValidated] = useState(false);

    function handleSubmit(event: FormEvent) {
        setValidated(true);
        if(!formRef.current!.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setValidated(false);
            event.preventDefault();
            onSubmit({
                to: toRef.current!.value,
                from: fromRef.current!.value,
                cc: ccRef.current ? ccRef.current.value.split(/,|;/)
                    .map(function(cc) {
                        return cc.trim()
                    }) : [],
                subject: subjectRef.current!.value,
                importance: selected.value,
                content: contentRef.current!.value
            })
            formRef.current!.reset();
        }
    }

    function handleCancel() {
        setShowModal(true);
    }

    const handleYes = () => {
        formRef.current!.reset();
        setShowModal(false);
    }

    const handleNo = () => {
        setShowModal(false);
    }

    const showCancelDialog = ():ReactNode => {
        return (
            <Modal show={showModal} onHide={handleCancel} centered className="modal-sm">
                <Modal.Dialog>
                    <Modal.Body>
                        <p>Are you sure you want to discard?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleYes}>Yes</Button>
                        <Button variant="secondary" onClick={handleNo}>No</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        )
    }

    return (
        <>
            {showCancelDialog()}
            <div className="card my-5 w-50">
                <div className="card-body">
                    <Form
                        ref={formRef}
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}>
                        <Stack gap={4}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="to">
                                        <Form.Label>To</Form.Label>
                                        <Form.Control
                                            required
                                            ref={toRef}
                                            type='email'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid email
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="from">
                                        <Form.Label>From</Form.Label>
                                        <Form.Control
                                            required
                                            ref={fromRef}
                                            type='email'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid email
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="cc">
                                        <Form.Label>CC</Form.Label>
                                        <Form.Control
                                            required={false}
                                            ref={ccRef}
                                            pattern="^(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*(;|,)\s*|\s*$))*$"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid email
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="subject">
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control
                                            required
                                            ref={subjectRef}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a subject
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="importance">
                                        <Form.Label>Importance</Form.Label>
                                        <CreatableSelect
                                            defaultValue={options[0]}
                                            isMulti={false}
                                            options={options}
                                            onChange={ sel => {
                                                    setSelected(s => {
                                                        return { label: s.label, value: s.value }
                                                    })
                                                }
                                            }
                                            />
                                    </Form.Group>
                                    <Form.Group controlId="content">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control
                                            required
                                            as="textarea"
                                            rows={7}
                                            ref={contentRef}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter the email content
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Stack direction="horizontal" gap={2} className="justify-content-end">
                                <Button
                                    type="submit"
                                    variant="primary"
                                >
                                    Send
                                </Button>
                                <Button
                                    onClick={handleCancel}
                                    type="button"
                                    variant="outline-secondary"
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Stack>
                    </Form>
                </div>
            </div>
        </>
    )
}