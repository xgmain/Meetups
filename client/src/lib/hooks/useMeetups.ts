import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useMeetups = () => {
    const queryClient = useQueryClient();

    const { isPending, data: meetups } = useQuery({
        queryKey: ['meetups'],
        queryFn: async () => {
            const response = await agent.get<Meetup[]>('/meetups');
            console.log(response);
            return response.data;
        }
    });

    const updateMeetup = useMutation({
        mutationFn: async (meetup: Meetup) => {
            await agent.put('/meetups', meetup);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['meetups'],
            })
        }
    });

    const createMeetup = useMutation({
        mutationFn: async (meetup: Meetup) => {
            const response = await agent.post('/meetups', meetup);
            console.log(response);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['meetups']
            })
        }
    })

    const deleteMeetup = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/meetups/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['meetups']
            })
        }
    })

    return {
        meetups: meetups ?? [],
        isPending,
        updateMeetup,
        createMeetup,
        deleteMeetup
    }
}