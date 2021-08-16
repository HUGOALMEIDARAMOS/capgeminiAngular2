import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[OfertasService]
})
export class HomeComponent implements OnInit {

  public ofertas!: Oferta[]

  constructor(private ofertaService: OfertasService) { }

  ngOnInit(): void {
    //this.ofertas = this.ofertaService.getOferta()
    this.ofertaService.getOferta()
      .then(
        (ofertas: Oferta[]) => { 
          this.ofertas = ofertas
        }, 
        //(param: any) => console.log(param)
      )
      .catch((param: any) => {
        console.log(param)
      })
  }

}