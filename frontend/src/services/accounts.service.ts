import type { Account } from "../types/accounts.type";
import type { ApiResponse } from "../types/api.types";

export const getAccounts = async (token: string, userId: string): Promise<Account[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accounts?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });


        const result: ApiResponse<Account[]> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;
    } catch (error) {
        console.error("getAccounts 失敗", error);
        throw error;
    }
}

export const getAccountById = async (token: string, accountId: string): Promise<Account> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accounts/${accountId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result: ApiResponse<Account> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;

    } catch (error) {
        console.error("getAccountById error", error);
        throw error;
    }
}