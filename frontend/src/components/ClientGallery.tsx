import {Client} from "../model/Client";
import ClientCard from "./ClientCard";
import {Link} from "react-router-dom";
import {Button, Grid} from "@mui/material";


type ClientGalleryProps = {
    clients: Client[]
}
export default function ClientGallery(props: ClientGalleryProps) {
    const clientCards = props.clients.map(client => {
        return (
            <ClientCard client={client} key={client.id}/>
        )
    })

    return (
        <>
            <Grid sx={{display: 'flex', flexDirection: 'column'}}>
                <Button component={Link} to="/clients/add">
                    NEUER KUNDE
                </Button>
                <Grid xs={8} justifyContent='space-between' marginTop={5}>…
                    {clientCards}
                </Grid>
            </Grid>
        </>
    )
}
