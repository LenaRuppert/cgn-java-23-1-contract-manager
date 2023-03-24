import {Client} from "../model/Client";
import {Link} from "react-router-dom";
import {Button, Card, CardActions, CardContent, TextField} from "@mui/material";
import ConstructionIcon from '@mui/icons-material/Construction';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, {useState} from "react";
import SaveIcon from "@mui/icons-material/Save";

type ClientCardProps = {
    client: Client
    deleteClient: (id: string | undefined) => void
    updateClient: (id: string | undefined, updatedClient: Client) => void
}

export default function ClientCard(props: ClientCardProps) {
    export default function ClientCard(props: ClientCardProps) {
        const [updatedClient, setUpdatedClient] = useState<Client>({
            id: props.client.id,
            name: props.client.name,
        });

        function handleDelete() {
            props.deleteClient(props.client.id)
        }

        return (
            <Card sx={{marginBottom: 5}}>
                <CardContent>
                    <TextField
                        label="Name"
                        variant="standard"
                        value={updatedClient.name}
                        onChange={(e) =>
                            setUpdatedClient({...updatedClient, name: e.target.value})
                        }
                    />
                </CardContent>
                <CardActions sx={{justifyContent: "flex-end"}}>
                    <Button component={Link} to={"/clients/" + props.client.id} color="inherit">
                        <ConstructionIcon color="action"/>
                    </Button>
                    <Button onClick={() => props.updateClient(updatedClient.id, updatedClient)}>
                        <SaveIcon color="action"/>
                    </Button>
                    <Button onClick={handleDelete}>
                        <DeleteForeverIcon color="action"/>
                    </Button>
                </CardActions>
            </Card>
        )
}
