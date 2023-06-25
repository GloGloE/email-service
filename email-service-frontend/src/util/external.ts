export interface Email {
    to: string,
    from: string,
    cc?: string[],
    subject: string,
    importance: string,
    content: string
}

export interface Option {
    label: string,
    value: string
}

export const baseURL = "http://localhost:8080/api/v1/email";

export const Columns = [
    {
        Header: 'To',
        accessor: 'to'
    },
    {
        Header: 'From',
        accessor: 'from'
    },
    {
        Header: 'CC',
        accessor: 'cc'
    },
    {
        Header: 'Subject',
        accessor: 'subject'
    },
    {
        Header: 'Importance',
        accessor: 'importance'
    },
    {
        Header: 'Content',
        accessor: 'content'
    }
]