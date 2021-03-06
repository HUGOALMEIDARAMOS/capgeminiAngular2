import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { ordemCompraService } from '../ordem-compra-service';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers:[ordemCompraService]
})
export class OrdemCompraComponent implements OnInit {  

  public idPedidoCompra !: number
  public itensCarrinho: ItemCarrinho[] = []

  public formulario : FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),  //recebe 3 parametros (1 valor inicial do campo, 2 validadores, 3 )
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })
 
  constructor(private ordemCompraService: ordemCompraService, public carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.exibirItens()
  } 

  public confirmarCompra():void {
    if(this.formulario.status === 'INVALID'){
      this.formulario.get('endereco')?.markAsTouched()   //Para que as validações visuais nos componentes sejam efetuados em combinacao com value                      
      this.formulario.get('numero')?.markAsTouched()
      this.formulario.get('formaPagamento')?.markAsTouched()
    }else{

      if(this.carrinhoService.exibirItens().length === 0){
        alert('Você não selecionou nenhum item para o carrinho')
      }else{     

      let pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.carrinhoService.exibirItens()
        )
        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedido: number)=>{
            this.idPedidoCompra = idPedido
            this.carrinhoService.limparCarrinho()
          })
        }
    }
  }
  
  public adcionar(item: ItemCarrinho): void {
    this.carrinhoService.adcionarQuantidade(item)
  }

  public remover(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item)
  }
  

     
}
