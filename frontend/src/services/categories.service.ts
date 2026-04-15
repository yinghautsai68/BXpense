import type { ApiResponse } from "../types/api.types";
import type { CategoryType, CreateCategoryType } from "../types/categories.type";

export const createCategory = async (token: string, categoryForm: CreateCategoryType) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryForm)
        });

        const result: ApiResponse<CategoryType> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.message;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

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