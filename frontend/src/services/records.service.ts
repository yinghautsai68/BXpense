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

type getRecordsParamsType = {
    type?: 'expense' | 'income',
    account_id?: number,
    sort?: 'amount_desc',
    limit?: number,
    year?: string,
    month?: string
}
export const getMyRecords = async (token: string, params?: getRecordsParamsType): Promise<RecordType[]> => {

    const query = new URLSearchParams();
    if (params?.account_id) query.append('account_id', String(params.account_id));
    if (params?.type) query.append('type', params.type);
    if (params?.sort) query.append('sort', params.sort);
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.year) query.append('year', params.year);
    if (params?.month) query.append('month', params.month);
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records/me?${query.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result: ApiResponse<RecordType[]> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    } catch (error) {
        throw error;
    }
}


//<Record<string, Record<string, RecordType[]>>>
export const getMyGroupedRecords = async (token: string, params?: getRecordsParamsType) => {

    const query = new URLSearchParams();
    if (params?.account_id) query.append('account_id', String(params.account_id));
    if (params?.type) query.append('type', params.type);
    if (params?.sort) query.append('sort', params.sort);
    if (params?.limit) query.append('limit', String(params.limit));

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records/me/grouped?${query.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result;
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

export const getRecordsByAccountId = async (token: string, accountId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records?account_id=${accountId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
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

export const getMonthlySummary = async (token: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records/monthly-summary`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (!result.success) {
            throw new Error;
        }
        return result.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateRecordById = async (token: string, recordId: string, recordForm: createRecordType) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records/${recordId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(recordForm)
        })
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

export const getTopExpenseRecords = async (token: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records/top-expenses`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
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

export const getSummary = async (token: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/records/summary`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
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

