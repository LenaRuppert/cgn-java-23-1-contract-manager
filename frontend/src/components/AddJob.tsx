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
        "description": "",
        "street": "",
        "houseNumber": "",
        "postalCode": "",
        "city": "",
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

    function handleChangeDescription(event: ChangeEvent<HTMLInputElement>) {
        setJobToAdd({
            ...jobToAdd,
            description: event.target.value
        })
    }

    function handleChangeStreet(event: ChangeEvent<HTMLInputElement>) {
        setJobToAdd({
            ...jobToAdd,
            street: event.target.value
        })
    }

    function handleChangeHouseNumber(event: ChangeEvent<HTMLInputElement>) {
        setJobToAdd({
            ...jobToAdd,
            houseNumber: event.target.value
        })
    }

    function handleChangePostalCode(event: ChangeEvent<HTMLInputElement>) {
        setJobToAdd({
            ...jobToAdd,
            postalCode: event.target.value
        })
    }

    function handleChangeCity(event: ChangeEvent<HTMLInputElement>) {
        setJobToAdd({
            ...jobToAdd,
            city: event.target.value
        })
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.addJob(id, jobToAdd)
        setJobToAdd({
            ...jobToAdd,
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
            <Typography sx={{textAlign: 'center'}} variant='h6'>Neuer Auftrag von {client?.name}</Typography>
            <TextField id="outlined-basic" label="Titel" variant="outlined" value={jobToAdd.title}
                       onChange={handleChangeTitle}/>
            <TextField
                id="outlined-multiline-static"
                label="Beschreibung"
                multiline
                rows={4}
                value={jobToAdd.description}
                onChange={handleChangeDescription}
            />
            <Typography sx={{textAlign: 'center'}}>Adresse</Typography>
            <TextField id="outlined-basic" label="Straße" variant="outlined" value={jobToAdd.street}
                       onChange={handleChangeStreet}/>
            <TextField id="outlined-basic" label="Hausnummer" variant="outlined" value={jobToAdd.houseNumber}
                       onChange={handleChangeHouseNumber}/>
            <TextField id="outlined-basic" label="Postleitzahl" variant="outlined" value={jobToAdd.postalCode}
                       onChange={handleChangePostalCode}/>
            <TextField id="outlined-basic" label="Ort" variant="outlined" value={jobToAdd.city}
                       onChange={handleChangeCity}/>
            <Button variant="contained" type="submit">hinzufügen</Button>
        </Box>
    )
}
