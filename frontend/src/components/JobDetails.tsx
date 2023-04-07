import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Job} from "../model/Job";
import axios from "axios";
import {Box, Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import Layout from "./Layout";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

type JobDetailsProps = {
    updateJob: (id: string | undefined, updatedJob: Job) => void
}

export default function JobDetails(props: JobDetailsProps) {
    const params = useParams()
    const id: string | undefined = params.id
    const [details, setDetails] = useState<Job | undefined>()
    const requestURL: string = "/api/jobs/" + id

    useEffect(() => {
        axios.get(requestURL)
            .then((response) => {
                setDetails(response.data)
                const initialUpdatedJob: Job = {
                    id: id ? id : "",
                    title: response.data.title ?? "",
                    description: response.data.description ?? "",
                    street: response.data.street ?? "",
                    houseNumber: response.data.houseNumber ?? "",
                    postalCode: response.data.postalCode ?? "",
                    city: response.data.city ?? "",
                    orderDate: response.data.orderDate ?? "",
                    clientId: response.data.clientId ?? ""
                };
                setUpdatedJob(initialUpdatedJob);
            })
            .catch((error) => console.error(error))
    }, [requestURL])

    const [updatedJob, setUpdatedJob] = useState<Job>({
        id: id ? id : "",
        title: "",
        description: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        city: "",
        orderDate: "",
        clientId: ""
    });
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);

    function handleUpdateClick() {
        setIsUpdateVisible(true);
    }

    function handleUpdateCancel() {
        setIsUpdateVisible(false);
    }

    function handleUpdateSave() {
        setIsUpdateVisible(false);
        props.updateJob(updatedJob.id, updatedJob)
        setDetails(updatedJob)
    }

    return (
        <>
            <Layout>
                <Box sx={{
                    marginTop: '30px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        {isUpdateVisible ? (
                            <Card sx={{marginBottom: 5, width: '80%', justifyContent: 'space-around'}}>
                                <CardContent>
                                    <TextField
                                        label="Titel"
                                        variant="standard"
                                        value={updatedJob.title}
                                        onChange={(e) => setUpdatedJob({...updatedJob, title: e.target.value})}
                                        sx={{width: '94%', textDecoration: 'none'}}/>
                                    <TextField
                                        label="Beschreibung"
                                        variant="standard"
                                        value={updatedJob.description}
                                    onChange={(e) => setUpdatedJob({...updatedJob, description: e.target.value})}
                                    sx={{width: '94%', textDecoration: 'none'}}/>
                                <TextField
                                    label="Straße"
                                    variant="standard"
                                    value={updatedJob.street}
                                    onChange={(e) => setUpdatedJob({...updatedJob, street: e.target.value})}
                                    sx={{width: '94%', textDecoration: 'none'}}/>
                                <TextField
                                    label="Hausnummer"
                                    variant="standard"
                                    value={updatedJob.houseNumber}
                                    onChange={(e) => setUpdatedJob({...updatedJob, houseNumber: e.target.value})}
                                    sx={{width: '94%', textDecoration: 'none'}}/>
                                <TextField
                                    label="Postleitzahl"
                                    variant="standard"
                                    value={updatedJob.postalCode}
                                    onChange={(e) => setUpdatedJob({...updatedJob, postalCode: e.target.value})}
                                    sx={{width: '94%', textDecoration: 'none'}}/>
                                    <TextField
                                        label="Stadt"
                                        variant="standard"
                                        value={updatedJob.city}
                                        onChange={(e) => setUpdatedJob({...updatedJob, city: e.target.value})}
                                        sx={{width: '94%', textDecoration: 'none'}}/>
                                </CardContent>
                                <CardActions sx={{justifyContent: "flex-end", color: "black"}}>
                                    <Button onClick={handleUpdateCancel} sx={{color: 'black',}}>
                                        <ClearIcon color="action"/>
                                    </Button>
                                    <Button onClick={handleUpdateSave}>
                                        <SaveIcon color="action"/>
                                    </Button>
                                </CardActions>
                            </Card>
                        ) : (
                            <Card sx={{marginBottom: 5, width: '80%', justifyContent: 'space-around'}}>
                                <CardContent>
                                    <Typography variant="h6">{details?.title}</Typography>
                                    <Typography sx={{mt: 2}}>{details?.description}</Typography>
                                    <Typography sx={{mt: 3}}>{details?.street} {details?.houseNumber}</Typography>
                                    <Typography>{details?.postalCode} {details?.city}</Typography>
                                    <Typography
                                        sx={{mt: 3}}>Auftragsdatum: {details?.orderDate ? new Date(details.orderDate).toLocaleDateString() : ""}</Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent: "flex-end"}}>
                                    {!isUpdateVisible && (
                                        <Button onClick={handleUpdateClick}>
                                            <EditIcon color="action"/>
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        )}
                    </Box>
                </Box>
            </Layout>
        </>
    )
}