import {Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogTitle, Typography} from "@mui/material";
import {Job} from "../model/Job";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useClients} from "../hooks/useClients";

type JobCardProps = {
    job: Job
    deleteJobById: (id: string | undefined) => void
}

export default function JobCard(props: JobCardProps) {
    const [open, setOpen] = useState(false)

    const {clients} = useClients();
    const client = clients.find(c => c.id === props.job.clientId)

    function handleDelete() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleConfirmDelete() {
        props.deleteJobById(props.job.id);
        setOpen(false);
    }

    return (
        <>
            <Card sx={{marginBottom: 5, width: '90%'}}>
                <CardContent>
                    <Typography variant='h6'>{props.job.title}</Typography>
                    <Typography sx={{marginTop: 2}}>{props.job.description}</Typography>
                    <Typography sx={{marginTop: 4}}>Auftrag
                        vom: {props.job.orderDate ? new Date(props.job.orderDate).toLocaleDateString() : ""}</Typography>
                    <Typography sx={{marginTop: 1}}>{client?.name}</Typography>
                </CardContent>
                <CardActions sx={{justifyContent: "flex-end"}}>
                    <Button onClick={handleDelete}>
                        {open ? <DeleteForeverIcon color="error"/> : <DeleteForeverIcon color="action"/>}
                    </Button>
                    <Link to={"/jobs/" + props.job.id} style={{textDecoration: "none", color: "#0077FF"}}>Details</Link>
                </CardActions>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Auftrag {props.job.title} löschen?</DialogTitle>
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