import {Job} from "../model/Job";
import * as React from "react";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, TextField, Typography} from "@mui/material";
import {useClients} from "../hooks/useClients";

type AddJobProps = {
    addJob: (id: string | undefined, jobToAdd: Job) => void
}

export default function AddJob(props: AddJobProps) {

    const params = useParams();
    const id: string | undefined = params.id;

    const [jobToAdd, setJobToAdd] = useState<Job>({
        "title": "",
        "clientId": id ? id : ""
    })

    const {clients} = useClients();
    const client = clients.find(c => c.id === id)

    const navigate = useNavigate()

    function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setJobToAdd({
            ...jobToAdd,
            title: event.target.value
        })
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.addJob(id, jobToAdd)
        setJobToAdd({
            ...jobToAdd,
            title: ""
        })
        navigate("/")
    }

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                '& > :not(style)': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Typography sx={{textAlign: 'center'}} variant='h6'>Neuer Auftrag {client?.name}</Typography>
            <TextField id="outlined-basic" label="Titel" variant="outlined" value={jobToAdd.title}
                       onChange={handleChangeTitle}/>
            <Button variant="contained" type="submit">hinzufügen</Button>
        </Box>
    )
}
