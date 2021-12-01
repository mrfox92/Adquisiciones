import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { DispatchersService } from '../../services/dispatchers/dispatchers.service';

@Component({
  selector: 'app-stocktaking',
  templateUrl: './stocktaking.component.html',
  styles: [
  ]
})
export class StocktakingComponent implements OnInit, OnDestroy {

  materials: any[] = [];
  loading: boolean = false;
  lastPage = 1;
  currentPage = 1;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const addScroll = 1500;
    const posicion = ( document.documentElement.scrollTop || document.body.scrollTop ) + addScroll;
    const maximo = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if ( posicion > maximo ) {

      //  evaluamos si se estan cargando resultados
      if ( this.dispatchersServices.cargando ) { return; }


      if ( this.currentPage < this.lastPage ) {

        this.getMaterials();

      }

    }
  }

  constructor(
    private dispatchersServices: DispatchersService
  ) { }

  ngOnInit(): void {

    this.getMaterials();
  }

  ngOnDestroy(): void {

    this.dispatchersServices.resetMaterials();
    this.lastPage = 1;
    this.currentPage = 1;
  }


  getMaterials() {

    this.loading = true;

    this.dispatchersServices.getMaterials().subscribe( (resp: any) => {
      // this.materials = resp.materials.data;
      this.materials.push(...resp.materials.data);
      this.currentPage = resp.materials.current_page;
      this.lastPage = resp.materials.last_page;
      this.loading = false;
      // console.log( this.materials );
    });
  }

}
