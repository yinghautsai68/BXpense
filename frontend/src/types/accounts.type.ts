export type AccountType = {
    id: number,
    user_id: number,
    name: string,
    image_url: string,
    balance: number,
    created_at: string,
    updated_at: string
};

export type CreateAccountType = {
    name: string,
    image_url: string,
    balance: number
}