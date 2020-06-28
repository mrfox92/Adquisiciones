import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  termino: string = '';
  currentPage: number = 0;
  total: number = 0;
  lastPage: number = 0;
  firstPageUrl: string = null;
  lastPageUrl: string = null;
  nextPageUrl: string = null;
  prevPageUrl: string = null;
  //  loading
  loading: boolean = true;

  constructor( public userService: UserService ) { }

  ngOnInit(): void {
    //  cargamos los usuarios
    this.getUsers();
  }

  getUsers() {

    //  utilizamos nuestro loading
    this.loading = true;
    //  llamamos a nuestro servicio
    this.userService.cargarUsuarios( this.currentPage ).subscribe( (resp: any) => {
      console.log( resp );
      //  inicialiamos la pagina actual
      this.currentPage = resp.users.current_page;
      //  inicializamos datos referentes a la paginación de resultados
      this.lastPage = resp.users.last_page;
      //  urls paginas
      this.firstPageUrl = resp.users.first_page_url;
      this.lastPageUrl = resp.users.last_page_url;
      this.nextPageUrl = resp.users.next_page_url;
      this.prevPageUrl = resp.users.prev_page_url;
      //  inicializamos el total de registros
      this.total = resp.users.total;
      //  inicializamos nuestro array de usuarrios
      this.users = resp.users.data;

      //  utilizamos nuestro loading
      this.loading = false;
    });
  }

  nextPage() {

    // currentPage: number, nextPageUrl: string, lastPage: number

    //  hacer validacion para que no se pueda pedir una pagina siguiente si ya esta en la última página
    if ( this.currentPage >= this.lastPage || this.nextPageUrl === null ) {
      console.log('Pagina no valida, estas en la última página');
      return;
    }

    // let search;
    let search = ( this.termino !== '' ) ? true : false;

    this.loading = true;
    // llegado a este punto llamamos a nuestro servicio y enviamos la url de la página siguiente
    this.userService.nextPageUsers( this.nextPageUrl, this.termino, search ).subscribe( (resp: any) => {
      console.log( resp );
      if ( resp.status === 'success' ) {
        //  actualizar valores
        this.currentPage = resp.users.current_page;
        this.lastPage = resp.users.last_page;
        this.firstPageUrl = resp.users.first_page_url;
        this.lastPageUrl = resp.users.last_page_url;
        this.nextPageUrl = resp.users.next_page_url;
        this.prevPageUrl = resp.users.prev_page_url;
        this.total = resp.users.total;
        this.users = resp.users.data;
        this.loading = false;
      }
    });
  }

  prevPage() {
    // currentPage: number, prevPageUrl: string, lastPage: number
    //  hacer validacion para que no se pueda pedir una pagina anterior si ya esta en la primera página
    if ( this.currentPage <= 0 || this.prevPageUrl === null ) {
      console.log('Pagina no valida, estas en la primera página');
      return;
    }

    let search = ( this.termino !== '' ) ? true : false;

    this.loading = true;

    // llegado a este punto llamamos a nuestro servicio y enviamos la url de la página anterior
    this.userService.nextPageUsers( this.prevPageUrl, this.termino, search ).subscribe( (resp: any) => {
      console.log( resp );
      if ( resp.status === 'success' ) {
        //  actualizar valores
        this.currentPage = resp.users.current_page;
        this.lastPage = resp.users.last_page;
        this.firstPageUrl = resp.users.first_page_url;
        this.lastPageUrl = resp.users.last_page_url;
        this.nextPageUrl = resp.users.next_page_url;
        this.prevPageUrl = resp.users.prev_page_url;
        this.total = resp.users.total;
        this.users = resp.users.data;
        this.loading = false;
      }
    });

  }

  searchUser( termino: string ) {

    //  realizar busqueda a partir de dos caracteres

    //  pasar por un trim el termino de busqueda para evitar enviar espacios al principio y final de la cadena
    this.termino = termino;
    if ( this.termino.length <= 0 ) {
      console.log('dentro busqueda vacia');
      this.termino = '';
      this.getUsers();
      return;
    }

    console.log('busqueda...');

    //  loading
    this.loading = true;
    //  llamamos a nuestro servicio
    this.userService.buscarUsuarios( this.termino ).subscribe( (resp: any) => {
      if ( resp.status === 'success' ) {
        //  actualizar valores
        this.currentPage = resp.users.current_page;
        this.lastPage = resp.users.last_page;
        this.firstPageUrl = resp.users.first_page_url;
        this.lastPageUrl = resp.users.last_page_url;
        this.nextPageUrl = resp.users.next_page_url;
        this.prevPageUrl = resp.users.prev_page_url;
        this.total = resp.users.total;
        this.users = resp.users.data;
        this.loading = false;
      }
    },
    error => {
      console.log('Ha ocurrido un error');
      this.users = [];
      this.loading = false;
    });
  }

  borrarUsuario( user: User ) {
    //  si el usuario seleccionado es igual al usuario loggeado no debe poder eliminar
    if ( user.id === this.userService.user.id ) {
      Swal.fire({
        title: 'Accion no permitida',
        text: 'No se puede borrar a si mismo',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    //  preguntamos si desea eliminar el registros
    Swal.fire({
      title: `¿Deseas eliminar al usuario ${ user.name }?`,
      text: 'No podrás revertir esto una vez realizado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar'
    }).then( result => {

      if ( result.value ) {

        //  llamar servicio
        this.userService.deleteUser( user.id ).subscribe( (resp: any) => {
          console.log( resp );
          if ( resp.status === 'success' ) {

            //  cargamos nuestros usuarios
            this.getUsers();

            Swal.fire({
              title: 'Borrado!',
              text: 'El usuario ha sido borrado con éxito',
              icon: 'success'
            });
          }
        },
        error => {
          console.log( error );
          if ( error.error.code === 401 ) {
              Swal.fire({
                title: 'Error',
                text: error.error.message,
                icon: 'error'
              });
          }
        });

      }

    });

    console.log( user );
  }

  guardarUsuario( user: User ) {
    // console.log( user );
    this.userService.updateRoleUser( user ).subscribe( resp => {
      console.log( resp );
      if ( resp.status === 'success' ) {
        //  recargamos la data de nuestros usuarios
        Swal.fire({
          title: 'Role Actualizado',
          text: `se ha actualizado el role del usuario ${ user.name } exitosamente`,
          icon: 'success'
        });
      }
    },
    error => console.log( error ));
  }

}
