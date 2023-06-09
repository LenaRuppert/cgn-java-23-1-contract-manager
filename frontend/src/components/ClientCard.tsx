import {Client} from "../model/Client";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, {useState} from "react";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {Link} from "react-router-dom";
import {Job} from "../model/Job";

type ClientCardProps = {

    jobs: Job[]
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

    const [open, setOpen] = useState(false);

    const openJobsCount = props.jobs.filter(job => job.clientId === props.client.id).length;

    function handleDelete() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleConfirmDelete() {
        props.deleteClient(props.client.id);
        setOpen(false);
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
        <>
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
                        <Typography>{props.client.name}</Typography>
                        <Typography sx={{mt: 2}}>offene Aufträge: {openJobsCount}</Typography>
                    </CardContent>
                )}
                <CardActions sx={{justifyContent: "flex-end"}}>
                    {openJobsCount === 0 && (
                        <Button onClick={handleDelete}>
                            {open ? <DeleteForeverIcon color="error"/> : <DeleteForeverIcon color="action"/>}
                        </Button>)}
                    {!isUpdateVisible && (
                        <Button onClick={handleUpdateClick}>
                            <EditIcon color="action"/>
                        </Button>
                    )}
                    <Link to={"/jobs/get/" + props.client.id}
                          style={{textDecoration: "none", color: "#0077FF"}}> Aufträge </Link>
                </CardActions>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Kunde {props.client.name} löschen?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>abbrechen</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        löschen
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}



