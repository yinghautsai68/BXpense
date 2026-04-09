import type { ApiResponse } from "../types/api.types";
import type { Record } from "../types/records.type";

export const getRecords = async (token: string, userId: string): Promise<Record[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result: ApiResponse<Record[]> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;
    } catch (error) {
        console.error('getRecords error', error);
        throw error;
    }
}