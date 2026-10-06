export type SalePerson = {
    id: number,
    nome: string,
    telefone: string | null,
    pago: boolean
}

export type SaleProduct = {
    id: number,
    nome: string,
    preco: number,
    ativo: boolean
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
