export interface InvoiceAmount {
    amount: number;
    currencyCode: string;
}

export interface InvoiceAmountIncludingVAT {
    amount: number;
    currencyCode: string;
}

export interface InvoiceListSummary {
    downloadLink: string;
    invoiceNumber: string;
    contractorReference: string;
    invoiceDate: string;
    invoiceAmount: InvoiceAmount;
    invoiceAmountIncludingVAT: InvoiceAmountIncludingVAT;
}

export interface ContractInvoiceList {
    invoiceListSummary: InvoiceListSummary[];
}

export interface ClientContract {
    contractId: string;
    contractorName: string;
}

export interface ClientContractList {
    clientContracts: ClientContract[];
}

export interface InvoiceQueryModel {
    contract: string;
    startDate: string;
    endDate: string;
}