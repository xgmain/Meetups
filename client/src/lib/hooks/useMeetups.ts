import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import {useLocation} from "react-router";

export const useMeetups = (id?: string) => {
    const queryClient = useQueryClient();
    const location = useLocation();

    const { isPending, data: meetups } = useQuery({
        queryKey: ['meetups'],
        queryFn: async () => {
            const response = await agent.get<Meetup[]>('/meetups');
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        enabled: !id && location.pathname.includes("meetups"),
    });

    const { data: meetup, isLoading: isLoadingMeetup } = useQuery({
        queryKey: ['meetups', id],
        queryFn: async () => {
            const response = await agent.get<Meetup>(`/meetups/${id}`);
            return response.data;
        },
        enabled: !!id
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
        meetups,
        isPending,
        meetup,
        isLoadingMeetup,
        updateMeetup,
        createMeetup,
        deleteMeetup
    }
}