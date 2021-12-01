import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispatchersService } from '../../services/dispatchers/dispatchers.service';

@Component({
  selector: 'app-search-material',
  templateUrl: './search-material.component.html',
  styleUrls: ['./search-material.component.css']
})
export class SearchMaterialComponent implements OnInit {

  materials: any[] = [];
  termino: string;
  loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dispatchersService: DispatchersService
  ) { }

  ngOnInit(): void {
    this.getSearch();
  }


  getSearch() {

    this.loading = true;
    this.activatedRoute.params.subscribe( params => {
      //  llamar servicio
      this.termino = params.termino;
      this.dispatchersService.getSearchResults( params.termino ).subscribe( resp => {
        this.materials = resp.materials;
        this.loading = false;
      });
    });
  }

}
