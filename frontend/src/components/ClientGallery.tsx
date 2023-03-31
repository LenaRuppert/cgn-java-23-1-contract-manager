import {Client} from "../model/Client";
import ClientCard from "./ClientCard";
import {Link} from "react-router-dom";
import {Button, Grid} from "@mui/material";
import Layout from "./Layout";


type ClientGalleryProps = {
    clients: Client[]
    deleteClient: (id: string | undefined) => void

    updateClient: (id: string | undefined, updatedClient: Client) => void
}
export default function ClientGallery(props: ClientGalleryProps) {
    const clientCards = props.clients.map((client) => {
        return (
            <ClientCard client={client} key={client.id} deleteClient={props.deleteClient}
                        updateClient={props.updateClient}/>
        )
    })

    return (
        <Layout>
            <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Button component={Link} to="/clients/add">
                    NEUER KUNDE
                </Button>
                <Grid container item xs={10} justifyContent='center' marginTop={5}>
                    {clientCards}
                </Grid>
            </Grid>
        </Layout>
    )
}
