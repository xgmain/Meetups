import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { formatDate } from "../../../lib/util/util";
import { useState } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";

type Props = {
    meetup: Meetup
}

export default function MeetupInfo({meetup}: Props) {
    const [mapOpen, setMapOpen] = useState(false);
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
                <Grid size={11} display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography>
                        {meetup.venue}, {meetup.city}
                    </Typography>
                    <Button onClick={() => setMapOpen(!mapOpen)}>
                        {mapOpen ? 'Hide Map' : 'Show Map'}
                    </Button>
                </Grid>
            </Grid>
            {mapOpen && (
                <Box sx={{height: 400, zIndex: 1000, display: 'block'}}>
                    <MapComponent
                        position={[meetup.latitude, meetup.longitude]}
                        venue={meetup.venue}
                    />
                </Box>

            )}
        </Paper>
    )
}