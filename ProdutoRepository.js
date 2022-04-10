class ProdutoRepository {
  constructor() {
    this._produtos = []
    this._chaveProduto = 'produtos'

    if (localStorage.getItem(this._chaveProduto) === null) {
      localStorage.setItem(this._chaveProduto, JSON.stringify(this._produtos))
    }
  }

  _formatarProdutos() {
    let produtosJson = localStorage.getItem(this._chaveProduto)
    let produtosSemClasse = JSON.parse(produtosJson)
    this._produtos = produtosSemClasse.map(
      produto => new Produto(produto._modelo, produto._marca, produto._ano, produto._cor)
    )
  }

  salvarProduto(produto) {
    if (produto instanceof Produto) {
      this._formatarProdutos()

      this._produtos.push(produto)
      localStorage.setItem('produtos', JSON.stringify(this._produtos))
    }
  }

  listarProdutos() {
    this._formatarProdutos()

    return [...this._produtos]
  }

  filtrarProdutosPorAno(ano) {
    this._formatarProdutos()

    this._produtos.filter(produto => produto.getAno() === ano)
  }


  filtrarProdutosPorMarca(marca) {
    this._formatarProdutos()

    return this._produtos.filter(produto => produto.getMarca() === marca)
  }

  removerProduto(modelo) {
    this._formatarProdutos()

    this._produtos = this._produtos.filter(produto => produto.getModelo() !== modelo)

    localStorage.setItem('produtos', JSON.stringify(this._produtos))
  }

  editarProduto(novoProduto) {
    this._formatarProdutos()

     let index = this._produtos.findIndex(produto => produto.getModelo() === novoProduto.getModelo())
     this._produtos[index] = novoProduto

    this._produtos = this._produtos.map(produto => {
      if (produto.getModelo() === novoProduto.getModelo()) {
        return novoProduto
      } else {
        return produto
      }
    })

    localStorage.setItem(this._chaveProduto, JSON.stringify(this._produtos))
  }
}