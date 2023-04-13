import {Client} from "../model/Client";
import ClientCard from "./ClientCard";
import {Link, Navigate} from "react-router-dom";
import {Button, Grid} from "@mui/material";
import Layout from "./Layout";
import * as React from "react";
import useAuth from "../hooks/useAuth";
import {Job} from "../model/Job";


type ClientGalleryProps = {
    jobs: Job[]
    clients: Client[]
    deleteClient: (id: string | undefined) => void

    updateClient: (id: string | undefined, updatedClient: Client) => void
}
export default function ClientGallery(props: ClientGalleryProps) {
    const {user, isLoading} = useAuth(true);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login"/>;
    }
    const clientCards = props.clients.map((client) => {
        return (
            <ClientCard client={client} key={client.id} deleteClient={props.deleteClient}
                        updateClient={props.updateClient} jobs={props.jobs}/>
        )
    })

    return (
        <Layout>
            <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Button sx={{marginTop: 3}} variant="contained" component={Link} to="/clients/add">
                    NEUER KUNDE
                </Button>
                <Grid container item xs={10} justifyContent='center' marginTop={5}>
                    {clientCards}
                </Grid>
            </Grid>
        </Layout>
    )
}
