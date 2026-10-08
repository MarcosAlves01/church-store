export type PessoaComVendas = {
    id: number;
    nome: string;
    telefone: string;
    totalGasto: number;
    pago: boolean;
}

export type SummaryData = {
    totalPessoas: number,
    totalProdutos: number,
    totalVendas: number,
    pessoasPagas: number,
    produtosAtivos: number,
    faturamentoTotal: number,
    valorMedioPorVenda: number,
    pessoasComVendas: PessoaComVendas[]
}
