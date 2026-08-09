import { Card, Badge, CardMedia, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";

type Props = {
    meetup: Meetup
}

export default function MeetupDetailsHeader({meetup}: Props) {
    const isCancelled = false;
    const isHost = true;
    const isGoing = true;
    const loading = false;

    return (
        <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
            {isCancelled && (
                <Badge
                    sx={{ position: 'absolute', left: 40, top: 20, zIndex: 1000 }}
                    color="error"
                    badgeContent="Cancelled"
                />
            )}
            <CardMedia
                component="img"
                height="300"
                image={`/images/categoryImages/${meetup.category}.jpg`}
                alt={`${meetup.category} image`}
            />
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                color: 'white',
                padding: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
                boxSizing: 'border-box',
            }}>
                {/* Text Section */}
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{meetup.title}</Typography>
                    <Typography variant="subtitle1">{formatDate(meetup.date)}</Typography>
                    <Typography variant="subtitle2">
                        Organized by <Link to={`/profiles/username`} style={{ color: 'white', fontWeight: 'bold' }}>Bob</Link>
                    </Typography>
                </Box>

                {/* Buttons aligned to the right */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {isHost ? (
                        <>
                            <Button
                                variant='contained'
                                color={isCancelled ? 'success' : 'error'}
                                onClick={() => { }}
                            >
                                {isCancelled ? 'Re-activate Meetup' : 'Cancel Meetup'}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/manage/${meetup.id}`}
                                disabled={isCancelled}
                            >
                                Manage Event
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color={isGoing ? 'primary' : 'info'}
                            onClick={() => { }}
                            disabled={isCancelled || loading}
                        >
                            {isGoing ? 'Cancel Attendance' : 'Join Meetup'}
                        </Button>
                    )}
                </Box>
            </Box>
        </Card>
    )
}