import { Grid } from "@mui/material";
import MeetupList from "./MeetupList";

export default function MeetupDashboard() {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <MeetupList />
            </Grid>
            <Grid size={5}>
                Meetup filters go here
            </Grid>
        </Grid>
    )
}