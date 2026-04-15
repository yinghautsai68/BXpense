import type { ApiResponse } from "../types/api.types";
import type { CategoryType, CreateCategoryType } from "../types/categories.type";
import type { createRecordType } from "../types/records.type";

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

export const getCategoryById = async (token: string, categoryId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result: ApiResponse<CategoryType> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateCategoryById = async (token: string, categoryId: string, categoryForm: CreateCategoryType) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryForm)
        });
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const deleteCategoryById = async (token: string, categoryId: number) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.message;
    } catch (error) {
        console.error(error)
        throw error;
    }
}