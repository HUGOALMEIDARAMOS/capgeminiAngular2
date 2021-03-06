import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers:[OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

 

  public oferta !: Oferta

  //private tempoObservableSubscription !: Subscription
  //private meuObervableTesteSubscript !: Subscription
  

  constructor( private route: ActivatedRoute, private ofertaService: OfertasService, private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.route.params.subscribe((parametros: Params) =>{
      this.ofertaService.getOfertaPorId( parametros.id)
      .then(( oferta: Oferta ) => {
        this.oferta = oferta
        console.log(this.oferta)
      })
    })

  }

   ngOnDestroy(){
     //this.tempoObservableSubscription.unsubscribe()
     //this.meuObervableTesteSubscript.unsubscribe()
   }

 
  public mudarImagem(termopesquisa: any) : void{       
    document.querySelector("#principal")?.setAttribute('src',termopesquisa.url)  
   }

   public adcionarItemCarrinho(oferta: Oferta): void{
    this.carrinhoService.incluirItem(this.oferta)
    console.log(this.carrinhoService.exibirItens())
 
   }
  
  
}
