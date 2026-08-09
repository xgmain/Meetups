import { Box, Button, Paper, Typography } from "@mui/material";
import { useMeetups } from "../../../lib/hooks/useMeetups";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { meetupSchema, type MeetupSchema } from "../../../lib/schemas/meetupSchema";
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function MeetupForm() {
    const { control, reset, handleSubmit } = useForm<MeetupSchema>({
        mode: 'onTouched',
        resolver: zodResolver(meetupSchema)
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateMeetup, createMeetup, meetup, isLoadingMeetup } = useMeetups(id);

    useEffect(() => {
        if (meetup) {
            reset({
                ...meetup,
                location: {
                    city: meetup.city,
                    venue: meetup.venue,
                    latitude: meetup.latitude,
                    longitude: meetup.longitude
                }
            });
        }
    }, [meetup, reset]);

    const onSubmit = async (data: MeetupSchema) => {
        const { location, ...rest } = data;
        const flattenedData = { ...rest, ...location };
        try {
            if (meetup) {
                updateMeetup.mutate({ ...meetup, ...flattenedData } as Meetup, {
                    onSuccess: () => navigate(`/meetups/${meetup.id}`)
                });
            } else {
                createMeetup.mutate(flattenedData as Meetup, {
                    onSuccess: (id) => {
                        navigate(`/meetups/${id}`);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoadingMeetup) return <Typography>Loading meetup...</Typography>;

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {meetup ? 'Edit Meetup' : 'Create Meetup'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Title' control={control} name='title' />
                <TextInput label='Description' name='description' control={control} multiline rows={3} />
                <Box display='flex' gap={3}>
                    <SelectInput
                        items={categoryOptions}
                        label='Category'
                        control={control}
                        name='category'
                    />
                    <DateTimeInput label='Date' control={control} name='date' />
                </Box>
                <LocationInput control={control} label="Enter the location" name="location" />
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