import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useMeetups } from "../../../lib/hooks/useMeetups";
import { useNavigate, useParams } from "react-router";

function toLocalDateTimeInputValue(date: string | Date) {
    const value = new Date(date);
    const timezoneOffset = value.getTimezoneOffset() * 60000;

    return new Date(value.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

export default function MeetupForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateMeetup, createMeetup, meetup, isLoadingMeetup } = useMeetups(id);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (meetup) {
            data.id = meetup.id;
            await updateMeetup.mutateAsync(data as unknown as Meetup);
            navigate(`/meetups/${meetup.id}`);
        } else {
            createMeetup.mutate(data as unknown as Meetup, {
                onSuccess: (id) => {
                    navigate(`/meetups/${id}`)
                }
            });
        }
    };

    if (isLoadingMeetup) return <Typography>Loading meetup...</Typography>;

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {meetup ? 'Edit Meetup' : 'Create Meetup'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField name='title' label='Title' defaultValue={meetup?.title || ''} />
                <TextField name='description' label='Description' defaultValue={meetup?.description || ''} multiline rows={3} />
                <TextField name='category' defaultValue={meetup?.category || ''} label='Category' />
                <TextField name='date' defaultValue={toLocalDateTimeInputValue(meetup?.date || new Date())}
                           label='Date' type="datetime-local"
                />
                <TextField name='city' defaultValue={meetup?.city || ''} label='City' />
                <TextField name='venue' defaultValue={meetup?.venue || ''} label='Venue' />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button color='inherit'>Cancel</Button>
                    <Button
                        type="submit"
                        color='success'
                        variant="contained"
                        loading={updateMeetup.isPending || createMeetup.isPending}
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}