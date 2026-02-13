export interface Invoice {
    id: string;
    customer: string;
    rfc: string;
    amount: number;
    status: 'Timbrada' | 'Pendiente' | 'Cancelada';
    date: string;
    useCfdi: string;
    cp: string;
}

export interface NewInvoiceData {
    customer: string;
    rfc: string;
    useCfdi: string;
    cp: string;
    amount: number;
}
