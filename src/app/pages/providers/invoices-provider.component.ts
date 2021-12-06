import { Component, OnInit } from '@angular/core';
import { AcquisitionsService } from '../../services/acquisitions/acquisitions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoices-provider',
  templateUrl: './invoices-provider.component.html',
  styleUrls: ['./invoices-provider.component.css']
})
export class InvoicesProviderComponent implements OnInit {

  public invoices: any[] = [];
  loading: boolean = false;

  constructor(
    private acquisitionsService: AcquisitionsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.loading = true;

    this.activatedRoute.params.subscribe( params => {

      this.acquisitionsService.getInvoicesProvider( params.id ).subscribe( (resp: any) => {
        console.log( resp );
        this.invoices = resp.provider.invoices;
        this.loading = false;
      });
    });

  }

}
