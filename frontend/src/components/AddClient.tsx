import * as React from 'react';
import {ChangeEvent, FormEvent, useState} from 'react';
import {Client} from "../model/Client";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";


type AddClientProps = {

    addClient: (clientToAdd: Client) => void
}

export default function AddClient(props: AddClientProps) {

    const [clientToAdd, setClientToAdd] = useState<Client>({
        id: "",
        name: ""
    })

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setClientToAdd({
            ...clientToAdd,
            name: event.target.value
        })
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.addClient(clientToAdd)
        setClientToAdd({
            ...clientToAdd,
            name: ""
        })
    }

    return (
        <Grid container direction="column">
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
                <Typography variant="h5">Neuer Kunde</Typography>
                <TextField id="outlined-basic" label="Name" variant="outlined" value={clientToAdd.name}
                           onChange={handleChangeName}/>
                <Button variant="contained" type="submit">hinzufügen</Button>
            </Box>
        </Grid>
    )
}
