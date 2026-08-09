import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { formatDate } from "../../../lib/util/util";

type Props = {
    meetup: Meetup
}

export default function MeetupInfo({meetup}: Props) {
    return (
        <Paper sx={{ mb: 2 }}>

            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Info color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{meetup.description}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <CalendarToday color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{formatDate(meetup.date)}</Typography>
                </Grid>
            </Grid>
            <Divider />

            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Place color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>
                        {meetup.venue}, {meetup.city}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}