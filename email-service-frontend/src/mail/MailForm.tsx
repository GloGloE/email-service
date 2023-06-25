import {FormEvent, ReactElement, useRef, useState} from "react";
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
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

    const toRef = useRef<HTMLInputElement>(null);
    const fromRef = useRef<HTMLInputElement>(null);
    const ccRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [selected, setSelected] = useState<Option>(options[0]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit({
            to: toRef.current!.value,
            from: fromRef.current!.value,
            cc: ccRef.current ? ccRef.current.value.split(";")
                                                   .map(function(cc) {
                                                       return cc.trim()
                                                   }) : [],
            subject: subjectRef.current!.value,
            importance: selected.value,
            content: contentRef.current!.value
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="to">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                required
                                ref={toRef}
                            />
                        </Form.Group>
                        <Form.Group controlId="from">
                            <Form.Label>From</Form.Label>
                            <Form.Control
                                required
                                ref={fromRef}
                            />
                        </Form.Group>
                        <Form.Group controlId="cc">
                            <Form.Label>CC</Form.Label>
                            <Form.Control
                                required={false}
                                ref={ccRef}
                            />
                        </Form.Group>
                        <Form.Group controlId="subject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                required
                                ref={subjectRef}
                            />
                        </Form.Group>
                        <Form.Group controlId="importance">
                            <Form.Label>Importance</Form.Label>
                            <CreatableSelect
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
                        type="button"
                        variant="outline-secondary"
                    >
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Form>
    )
}