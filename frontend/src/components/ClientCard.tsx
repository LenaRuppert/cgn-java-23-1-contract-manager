import {Client} from "../model/Client";
import {Button, Card, CardActions, CardContent, TextField} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, {useState} from "react";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {Link} from "react-router-dom";

type ClientCardProps = {
    client: Client
    deleteClient: (id: string | undefined) => void
    updateClient: (id: string | undefined, updatedClient: Client) => void
}

export default function ClientCard(props: ClientCardProps) {
    const [updatedClient, setUpdatedClient] = useState<Client>({
        id: props.client.id,
        name: props.client.name,
    });
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);

    function handleDelete() {
        props.deleteClient(props.client.id)
    }

    function handleUpdateClick() {
        setIsUpdateVisible(true);
    }

    function handleUpdateCancel() {
        setIsUpdateVisible(false);
    }

    function handleUpdateSave() {
        setIsUpdateVisible(false);
        props.updateClient(updatedClient.id, updatedClient);
    }

    return (
        <Card sx={{marginBottom: 5, width: '90%'}}>
            {isUpdateVisible ? (
                <CardContent>
                    <TextField
                        label="Name"
                        variant="standard"
                        value={updatedClient.name}
                        onChange={(e) =>
                            setUpdatedClient({...updatedClient, name: e.target.value})
                        }
                        sx={{width: '94%', textDecoration: 'none'}}
                    />
                    <CardActions sx={{justifyContent: "flex-end", color: "black"}}>
                        <Button onClick={handleUpdateCancel} sx={{color: 'black',}}>
                            <ClearIcon color="action"/>
                        </Button>
                        <Button onClick={handleUpdateSave}>
                            <SaveIcon color="action"/>
                        </Button>
                    </CardActions>
                </CardContent>
            ) : (
                <CardContent>
                    <div>{props.client.name}</div>
                </CardContent>
            )}
            <CardActions sx={{justifyContent: "flex-end"}}>
                {!isUpdateVisible && (
                    <Button onClick={handleUpdateClick}>
                        <EditIcon color="action"/>
                    </Button>
                )}
                <Button onClick={handleDelete}>
                    <DeleteForeverIcon color="action"/>
                </Button>
                <Link to={"/clients/" + props.client.id + "/addJob"} style={{textDecoration: "none", color: "#0077FF"}}>neuer
                    Job</Link>
            </CardActions>
        </Card>
    )
}
