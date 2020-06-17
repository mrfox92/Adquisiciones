import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

//  declaramos el nombre de la función
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './login.component.css' ]
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    public userService: UserService,
    public router: Router
  ) { }


  //  metodo para crear regla de validación personalizada
  //  comparar los campos de contraseña password1 contra password2
  sonIguales( campo1: string , campo2: string ) {

    return ( group: FormGroup ) => {

      //  obtenemos los valores de los campos
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      //  verificamos si son iguales
      if ( pass1 === pass2 ) {
        //  si son iguales la regla de validacion pasa
        return null;
      }

      //  caso contrario la regla de validación no pasará
      return {
        sonIguales: true
      };
    };
  }

  ngOnInit(): void {
    init_plugins();

    //  formulario aproximación por componente reactforms

    this.formulario = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      apellido: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [ Validators.required, Validators.email ] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2' ) });

    //  autocompletamos el formulario con una data aleatoria
    this.formulario.setValue({
      nombre: 'Test',
      apellido: '1',
      correo: 'test@test.com',
      password: 'test1234',
      password2: 'test1234',
      condiciones: true
    });
  }

  getMessage( title: string, text: string, icon: any ) {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK'
    });
  }

  registrarUsuario() {

    if ( this.formulario.invalid ) {
      return;
    }

    if ( !this.formulario.value.condiciones ) {
      //  utilizamos nuestra funcion
      this.getMessage( 'Importante!', 'Debe aceptar los términos y condiciones para completar el registro', 'warning' );
      return;
    }

    // console.log( 'Formulario válido', this.formulario.valid );
    // console.log( this.formulario.value );
    //  creamos nuestro usuario y le pasamos la data ya validada
    const user = new User(
      this.formulario.value.nombre,
      this.formulario.value.apellido,
      this.formulario.value.correo,
      this.formulario.value.password
    );

    //  hacemos la llamada a la petición
    this.userService.register( user ).subscribe(
      response => {
        console.log( response );
        this.formulario.reset();
        //  imprimimos el mensaje personalizado
        this.getMessage('Usuario creado con éxito', user.email, 'success' );
        //  navegamos hacia la pantalla de login
        this.router.navigate(['/login']);
      },
      error => {
        console.log( error );
      }
    );

  }

}

