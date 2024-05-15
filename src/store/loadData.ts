import useStore from "./store";

export const loadBankAccountListJSON = async () => {
    const response = await fetch('../assets/json/bankAccountList.json');
    const data = await response.json();
    useStore.getState().setBankAccountList(data.bankAccountList);
}

export const loadVoucherJSON = async () => {
    const response = await fetch('../assets/json/voucher.json');
    const data = await response.json();
    useStore.getState().setVoucherList(data.voucherList);
}