import {Job} from "../model/Job";
import * as React from "react";
import {ChangeEvent, FormEvent, useState} from "react";
import {useParams} from "react-router-dom";
import {Box, Button, TextField, Typography} from "@mui/material";

type AddJobProps = {
    addJob: (jobToAdd: Job) => void
}

export default function AddJob(props: AddJobProps) {

    const params = useParams();
    const clientId: string | undefined = params.clientId;

    const [jobToAdd, setJobToAdd] = useState<Job>({
        "title": "",
        "clientId": clientId ? clientId : ""
    })

    function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setJobToAdd({
            ...jobToAdd,
            title: event.target.value
        })
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.addJob(jobToAdd)
        setJobToAdd({
            ...jobToAdd,
            title: ""
        })
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
            <Typography sx={{textAlign: 'center'}} variant='h5'>Neuer Job</Typography>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={jobToAdd.title}
                       onChange={handleChangeTitle}/>
            <Button variant="contained" type="submit">hinzufügen</Button>
        </Box>
    )
}
