import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DispatchersService } from '../../services/dispatchers/dispatchers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  formulario: FormGroup;
  material: any = {};
  loading: boolean = false;
  cantidad: number = 1;
  pedido: any[] = [];

  @Output() changedPedido: EventEmitter<any> = new EventEmitter<any>();
  @Output() changedOrder: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dispatchersService: DispatchersService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    //  TODO verificar si es un id valido
    this.loading = true;
    this.activatedRoute.params.subscribe( params => {
      console.log( params );
      this.dispatchersService.getMaterial( params.id ).subscribe( (resp: any) => {
        console.log( resp );
        this.material = resp.material;
        this.loading = false;

        this.crearFormulario();
        this.cargarDataFormulario();

      });

    });

  }


  //  getters

  get invalidQty(): boolean {
    return this.formulario.get('cantidad').invalid;
  }

  get validQty(): boolean {
    return this.formulario.get('cantidad').valid;
  }

  cargarDataFormulario() {

    this.formulario.setValue({
      cantidad: this.cantidad
    });
  }


  crearFormulario() {

    this.formulario = this.fb.group({
      cantidad: ['', [ Validators.required, Validators.min(1), Validators.max( this.material.stock ) ]]
    });

  }

  guardar() {

    if ( this.formulario.invalid ) {
      console.log('Formulario invalido!');
      return;
    }
    console.log('Formulario valido!');
    console.log( this.formulario.value.cantidad );

    // TODO: validar si la cantidad de material disponible es mayor a 0

    // localStorage.setItem('materiales', )
    //  TODO: fusionar qty en caso de que los idProducto sean iguales
    const cartItem = {
      idProducto: this.material.id,
      name: this.material.name,
      qty: this.formulario.value.cantidad,
      stock: this.material.stock,
      image: this.material.picture
    };

    //  llamar servicio
    this.dispatchersService.addCartItem( cartItem ).subscribe( resp => {

      this.material = resp.material;
      this.cantidad = 1;
      this.cargarDataFormulario();
      //  emitimos
      this.changedPedido.emit( this.dispatchersService.pedido );
      this.changedOrder.emit( this.dispatchersService.orden );

      Swal.fire({
        title: 'Material añadido!',
        text: `${ this.material.name } ha sido agregado a la orden`,
        icon: 'success',
        timer: 1000
      });

      if ( this.material.stock === 0 ) {
        //  redireccionar a inventario
        this.router.navigate(['/inventario']);
      }

      //  si todo va bien imprimir mensaje de respuesta
    });

  }

}
