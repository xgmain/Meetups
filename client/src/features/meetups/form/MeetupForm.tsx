import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useMeetups } from "../../../lib/hooks/useMeetups";

type Props = {
    meetup?: Meetup
    closeForm: () => void
}

export default function MeetupForm({ closeForm, meetup }: Props) {
    const { updateMeetup, createMeetup } = useMeetups();

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
            closeForm();
        } else {
            await createMeetup.mutateAsync(data as unknown as Meetup);
            closeForm();
        }
    };

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                Create meetup
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField name='title' label='Title' defaultValue={meetup?.title || ''} />
                <TextField name='description' label='Description' defaultValue={meetup?.category || ''} multiline rows={3} />
                <TextField name='category' defaultValue={meetup?.category || ''} label='Category' />
                <TextField name='date' defaultValue={meetup?.date
                    ? new Date(meetup.date).toISOString().split('T')[0]
                    : new Date().toISOString().split('T')[0]}
                           label='Date' type="date"
                />
                <TextField name='city' defaultValue={meetup?.city || ''} label='City' />
                <TextField name='venue' defaultValue={meetup?.venue || ''} label='Venue' />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button onClick={closeForm} color='inherit'>Cancel</Button>
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