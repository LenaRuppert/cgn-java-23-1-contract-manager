import {Client} from "../model/Client";
import {Link} from "react-router-dom";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import ConstructionIcon from '@mui/icons-material/Construction'

type ClientCardProps = {
    client: Client
    deleteClient: (id: string | undefined) => void
}

export default function ClientCard(props: ClientCardProps) {

    function handleDelete() {
        props.deleteClient(props.client.id)
    }

    return (
        <Card sx={{marginBottom: 5}}>
            <CardContent>
                {props.client.name}
            </CardContent>
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <Button component={Link} to={"/clients/" + props.client.id} color={"inherit"}>
                    <ConstructionIcon/>
                </Button>
                <Button onClick={handleDelete}>
                    delete
                </Button>
            </CardActions>
        </Card>
    )
}
