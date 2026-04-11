import { create } from "zustand";
import type { createRecordType } from "../types/records.type";

type RecordStoreType = {
    recordForm: createRecordType,
    setRecordForm: (data: Partial<createRecordType>) => void,
    selectedAccountId: number | null,
    setSelectedAccountId: (id: number) => void
}
export const useRecordStore = create<RecordStoreType>((set) => ({
    recordForm: {
        user_id: 0,
        account_id: 0,
        category_id: 0,
        type: 'expense',
        amount: 0,
        remarks: '',
        record_date: new Date().toISOString().slice(0, 16),
    },
    setRecordForm: (data: Partial<createRecordType>) => set((state) => ({ recordForm: { ...state.recordForm, ...data } })),
    selectedAccountId: null,
    setSelectedAccountId: (id: number) => set({ selectedAccountId: id })
}));