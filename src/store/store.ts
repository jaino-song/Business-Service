import { create } from 'zustand';

interface BankAccount {
    area: string
    bankName: string
    accNum: string
}

interface VoucherDetails {
    fullPrice: string
    grant: string
    actualPrice: string
}

interface Voucher {
    [key: string]: {
        [key: string] : VoucherDetails
    }
}

interface StoreState {
    bankAccountList: BankAccount[]
    voucherList: Voucher
    setBankAccountList: (list: BankAccount[]) => void
    setVoucherList: (list: Voucher) => void
}

const useStore = create<StoreState>((set) => ({
    bankAccountList: [],
    voucherList: {},
    setBankAccountList: (state) => set({ bankAccountList: state }),
    setVoucherList: (state) => set({ voucherList: state })
}))

export default useStore;