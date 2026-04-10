import { create } from "zustand";

type RecordStoreType = {
    selectedAccountId: number | null,
    setSelectedAccountId: (id: number) => void
}
export const useRecordStore = create<RecordStoreType>((set) => ({
    selectedAccountId: null,
    setSelectedAccountId: (id: number) => set({ selectedAccountId: id })
}));