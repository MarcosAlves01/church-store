export type SummaryItem = {
    pessoaId: string,
    nome: string,
    pago: boolean,
    total: number
}

export type StatusFilter = "todos" | "pagos" | "pendentes"
