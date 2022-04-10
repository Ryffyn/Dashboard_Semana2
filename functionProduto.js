$(function(){

    mostrarDados();


	$(document).on("click", ".btnSalvar", function(){
        let modelo = $(".cModelo").val();
        let marca = $(".cMarca").val();
        let ano = $(".cAno").val();
        let cor = $(".cCor").val();
        
        let carro = new Produto(modelo, marca, ano, cor)
        let repositorio = new ProdutoRepository()

        repositorio.salvarProduto(carro)

            
        mostrarDados();
        limparCadastro()

        console.log(carro);
	})

    
	$(document).on("click", ".btnEditar", function(){
        let modelo = $(".cModelo").val();
        let marca = $(".cMarca").val();
        let ano = $(".cAno").val();
        let cor = $(".cCor").val();
        
        let carro = new Produto(modelo, marca, ano, cor)
        let repositorio = new ProdutoRepository()

        repositorio.editarProduto(carro)

        mostrarDados();

        console.log(carro);
	})

    $(document).on("click", ".btnLimpar", function(){
        limparCadastro()
        
	})

    $(document).on("keypress", ".cPesquisa", function(e){
         if(e.which == 13) {
            let repositorio = new ProdutoRepository()
            let pesquisa= $(".cPesquisa").val() 
            let carroFiltrado= repositorio.filtrarProdutosPorMarca(pesquisa)

            pesquisa ?  mostrarDados(carroFiltrado) : mostrarDados();
                       
        }    
	})


})


function limparDados(){
    const conteudoTabela = document.getElementById('conteudo-tabela')
    conteudoTabela.innerHTML= ""
}

function limparCadastro(){
        $(".cModelo").val("") 
        $(".cMarca").val("") 
        $(".cAno").val("")    
        $(".cCor").val("")
}

function remover(modelo){
    repositorio.removerProduto(modelo)
    mostrarDados();
}

function mostrarDados(carroFiltrado){

        const conteudoTabela = document.getElementById('conteudo-tabela')
        if(conteudoTabela){
            conteudoTabela.innerHTML= ""
        }
      
    
        const carros = carroFiltrado ? carroFiltrado : repositorio.listarProdutos();

        for (const carro of carros) {
        const linha = document.createElement('tr')

        const colunaModelo = document.createElement('td')
        colunaModelo.innerHTML = carro.getModelo()
        linha.appendChild(colunaModelo)

        const colunaMarca = document.createElement('td')
        colunaMarca.innerHTML = carro.getMarca()
        linha.appendChild(colunaMarca)

        const colunaAno = document.createElement('td')
        colunaAno.innerHTML = carro.getAno()
        linha.appendChild(colunaAno)

        const colunaCor = document.createElement('td')
        colunaCor.innerHTML = carro.getCor()
        linha.appendChild(colunaCor)

        const colunaButton= document.createElement('td')
        colunaButton.innerHTML ='  <button type="button" class="btn btn-danger btnRemover"   onclick=remover("' + carro.getModelo() +'")>Remover</button> '
        linha.appendChild(colunaButton)


        linha.onclick = function () {

            const elementoModelo = this.getElementsByTagName('td')[0].innerHTML
            let Modelo= document.getElementById('Modelo')
            Modelo.value=elementoModelo

            const elementoModelo2 = this.getElementsByTagName('td')[1].innerHTML
            let Marca= document.getElementById('Marca')
            Marca.value=elementoModelo2

            const elementoModelo3 = this.getElementsByTagName('td')[2].innerHTML
            let Ano= document.getElementById('Ano')
            Ano.value=elementoModelo3


            const elementoModelo4 = this.getElementsByTagName('td')[3].innerHTML
            let Cor= document.getElementById('Cor')
            Cor.value=elementoModelo4

    
            }

        conteudoTabela.appendChild(linha)
        }

}


