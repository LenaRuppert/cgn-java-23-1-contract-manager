import * as React from 'react';
import {ChangeEvent, FormEvent, useState} from 'react';
import {Client} from "../model/Client";
import {Box, Button, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


type AddClientProps = {

    addClient: (clientToAdd: Client) => void
}

export default function AddClient(props: AddClientProps) {

    const [clientToAdd, setClientToAdd] = useState<Client>({
        id: "",
        name: ""
    })

    const navigate = useNavigate()

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setClientToAdd({
            ...clientToAdd,
            name: event.target.value
        })
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.addClient(clientToAdd)
        setClientToAdd({
            ...clientToAdd,
            name: ""
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
                <Typography sx={{textAlign: 'center'}} variant='h5'>Neuer Kunde</Typography>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={clientToAdd.name}
                       onChange={handleChangeName}/>
            <Button variant="contained" type="submit">hinzufügen</Button>
            </Box>
    )
}
