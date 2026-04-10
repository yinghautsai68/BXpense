export type RecordType = {
    id: number,
    type: string,
    amount: number,
    remarks: string,
    record_date: string,
    created_at: string,
    updated_at: string,
    account_name: string,
    account_image_url: string,
    account_balance: number,
    category_name: string,
    category_image_url: string
};

export type createRecordType = {
    account_id: number,
    category_id: number,
    type: 'expense' | 'income',
    amount: number,
    remarks: string,
    record_date: string,
};