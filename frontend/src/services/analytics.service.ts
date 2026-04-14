export const getLine = async (token: string) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/analytics/line`, {
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

export const getCategorySummary = async (token: string) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/analytics`, {
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