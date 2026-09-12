export type SalePerson = {
    id: string,
    nome: string,
    telefone: string | null,
    pago: boolean
}

export type SaleProduct = {
    id: string,
    nome: string,
    preco: number,
    ativo: boolean
}

export type Sale = {
    id: string,
    pessoaId: string,
    produtoId: string,
    quantidade: number,
    precoNaHora: number,
    criadoEm: string,
    pessoa: SalePerson,
    produto: SaleProduct
}
