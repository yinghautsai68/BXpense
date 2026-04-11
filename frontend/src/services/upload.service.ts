export const uploadImage = async (token: string, formData: FormData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        const result = await response.json();
        if (!result.success) {
            throw new Error
        }

        return result.image_url;
    } catch (error) {
        console.error(error);
        throw error;
    }
}