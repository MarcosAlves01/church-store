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

export type SaleProduct = {
    id: number,
    nome: string,
    preco: number,
    ativo: boolean
}

export type SalePerson = {
    id: number,
    nome: string,
    telefone: string | null,
    pago: boolean
}

export type Sale = {
    id: number,
    pessoaId: number,
    produtoId: number,
    quantidade: number,
    precoNaHora: number,
    criadoEm: string,
    pessoa: SalePerson,
    produto: SaleProduct
}
