import type { ApiResponse } from "../types/api.types";
import type { createRecordType, RecordType } from "../types/records.type";

export const createRecord = async (token: string, record: createRecordType) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records`, {
            method: 'POST',
            headers: {
                'Content-Type': `application/json`,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(record)
        });
        const result: ApiResponse<RecordType> = await response.json();
        if (!result.success) {
            console.log(result.message);
            throw new Error;

        }

        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getRecords = async (token: string, userId: string): Promise<Record<string, RecordType[]>> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result: ApiResponse<Record<string, RecordType[]>> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;
    } catch (error) {
        console.error('getRecords error', error);
        throw error;
    }
}

export const getRecordById = async (token: string, recordId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records/${recordId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result: ApiResponse<RecordType> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteById = async (token: string, recordId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records/${recordId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result: ApiResponse<null> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.message;
    } catch (error) {
        console.error(error);
        throw error;
    }
}