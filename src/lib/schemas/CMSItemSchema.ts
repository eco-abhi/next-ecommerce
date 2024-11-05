import { z } from 'zod';

export const CMSItemSchema = z.object({

    dataCollectionId: z.string(),         // Root-level field
    _id: z.string().optional(),           // Root-level _id, optional
    data: z.object({                    // Nested object
        id: z.number(), // Make `id` optional to handle cases where it's missing
        title: z.string(),                     // Title as optional for flexibility
        subtitle: z.string().optional(),
        url: z.string().optional(),
        image: z.string(),
        background: z.string().optional(),
        _id: z.string().optional(),
        _owner: z.string().optional(),
        _createdDate: z
            .object({ $date: z.string().datetime() }) // Optional date field
            .optional(),
        _updatedDate: z
            .object({ $date: z.string().datetime() })
            .optional(),
    }).passthrough()
}).passthrough();
