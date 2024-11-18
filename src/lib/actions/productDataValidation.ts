import { ProductSchema } from "../schemas/ProductSchema";
import { z } from 'zod';

// Define the TypeScript type based on the schema
type ProductProps = z.infer<typeof ProductSchema>;

export const productDataValidation = (json: any): ProductProps => {
    try {
        return ProductSchema.parse(json);
    } catch (error) {
        console.error("Invalid product data:", error);
        throw new Error("Invalid product data");
    }
};