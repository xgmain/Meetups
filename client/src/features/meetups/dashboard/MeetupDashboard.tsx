import { Grid } from "@mui/material";
import MeetupList from "./MeetupList";
import MeetupFilters from "./MeetupFilters";

export default function MeetupDashboard() {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <MeetupList />
            </Grid>
            <Grid size={5}>
                <MeetupFilters />
            </Grid>
        </Grid>
    )
}