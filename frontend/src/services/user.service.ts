import type { ApiResponse } from "../types/api.types";
import type { User } from "../types/users.types";

export const getUserData = async (token: string, userId: string): Promise<User> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const result: ApiResponse<User> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    } catch (error) {
        console.error("getUserData 失敗", error);
        throw error;
    }
}

export const deleteUser = async (token: string, userId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }


        const result = await response.json();


        if (!result.success) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        console.error("deleteUser 失敗", error);
        throw error;
    }
}
export const resetUserData = async (token: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me/data`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }


        const result = await response.json();


        if (!result.success) {
            throw new Error(result.message);
        }

        return result.message;
    } catch (error) {
        console.error("deleteUser 失敗", error);
        throw error;
    }
}
