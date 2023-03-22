import {Client} from "../model/Client";
import {useParams} from "react-router-dom";
import * as React from "react";
import {ChangeEvent, FormEvent, useState} from "react";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";

type UpdateClientProps = {
    updateClient: (clientToUpdate: Client) => void
}

export default function UpdateClient(props: UpdateClientProps) {

    const params = useParams()
    const id: string | undefined = params.id

    const [clientToUpdate, setClientToUpdate] = useState<Client>({
        id: id ? id : "",
        name: ""
    })

    function onChangeName(event: ChangeEvent<HTMLInputElement>) {
        setClientToUpdate({
            ...clientToUpdate,
            name: event.target.value
        })
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.updateClient(clientToUpdate)
        setClientToUpdate({
            ...clientToUpdate,
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
                <Typography sx={{textAlign: 'center'}} variant="h5">Kundendaten</Typography>
                <TextField id="outlined-basic" label="Name" variant="outlined" value={clientToUpdate.name}
                           onChange={onChangeName}/>
                <Button variant="contained" type="submit">ändern</Button>
            </Box>
        </Grid>
    )
}
