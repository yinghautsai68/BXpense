import type { ApiResponse } from "../types/api.types";
import type { CategoryType } from "../types/categories.type";

export const getCategories = async (token: string, userId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result: ApiResponse<CategoryType[]> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}