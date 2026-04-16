export type User = {
    username: string,
    image_url: string,
    created_at: string,
    updated_at: string
}

export type EditUserFormType = {
    username: string,
    image_url: string,
    password: string,
    confirmPassword: string
}