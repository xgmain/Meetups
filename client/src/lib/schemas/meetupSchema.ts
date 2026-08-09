import {z} from 'zod';

const requiredString = (fieldName: string) => z.string({error: `${fieldName} is required`}).min(1,
    {error: `${fieldName} is required`})

export const meetupSchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: z.coerce.date({error: 'Date is required'}),
    location: z.object({
        venue: requiredString('Venue'),
        city: z.string().optional(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number()
    })
})

export type MeetupSchema = z.input<typeof meetupSchema>;