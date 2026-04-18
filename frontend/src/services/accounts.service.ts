import type { AccountType, CreateAccountType } from "../types/accounts.type";
import type { ApiResponse } from "../types/api.types";

export const createAccount = async (token: string, account: CreateAccountType) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(account)
        });
        const result = await response.json();
        if (!result.success) {
            console.error(result.message);
            throw new Error;
        }
        return result.message;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAccounts = async (token: string, userId: string): Promise<AccountType[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accounts?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });


        const result: ApiResponse<AccountType[]> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;
    } catch (error) {
        console.error("getAccounts 失敗", error);
        throw error;
    }
}

export const getMyAccounts = async (token: string): Promise<AccountType[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accounts/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result: ApiResponse<AccountType[]> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;

    } catch (error) {
        throw error;
    }
}


export const getAccountById = async (token: string, accountId: string): Promise<AccountType> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accounts/${accountId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result: ApiResponse<AccountType> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;

    } catch (error) {
        console.error("getAccountById error", error);
        throw error;
    }
}



export const getAssetsSummary = async (token: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accounts/total-assets`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        console.log(result.data)
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const updateAccountById = async (token: string, accountId: string, accountForm: CreateAccountType) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accounts/${accountId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(accountForm)
        });
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteAccountById = async (token: string, accountId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accounts/${accountId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (!result.success) {

            throw new Error(result.message);
        }

        return result.message;
    } catch (error) {
        console.error(error);
        throw error;
    }
}