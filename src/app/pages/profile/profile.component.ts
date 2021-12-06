import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  user: User;
  imageUpload: File;
  tempImage: string;

  constructor( public userService: UserService ) { }

  ngOnInit(): void {

    this.user = this.userService.user;
  }

  getMessage( title: string, text: string, icon: any ) {

    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK'
    });

  }

  guardar( user: User ) {
    this.user.name = user.name;
    this.user.last_name = user.last_name;
    this.user.email = user.email;

    //  llamamos el servicio para actualizar
    this.userService.updateUser( this.user ).subscribe( resp => {

      if ( resp.status === 'success' && resp.code === 200 ) {
        console.log( resp );
        this.getMessage('Perfil Actualizado', `${ this.user.name } ${ this.user.last_name } has actualizado tus datos`, 'success');
      }
    },
    err => {

      console.log( err );

      if ( err.error.code === 400 && err.error.errors.email[0] ) {

        Swal.fire({
          title: 'Ups!',
          text: `${ err.error.errors.email[0] }`,
          icon: 'error',
          confirmButtonText: 'OK'
        });

      }
    });
  }

  seleccionarImage( image: File ) {

    if ( !image ) {
      this.imageUpload = null;
      return;
    }

    //  validamos que el archivo a subir sea una imagem
    if ( image.type.indexOf('image') < 0 ) {
      Swal.fire({
        title: 'Ups!',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.imageUpload = null;
      return;
    }

    //  cargar preview imagen con vanilla javascript
    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL( image );
    //  el resultado muestra la imagen en base 64
    reader.onloadend = () => {
      this.tempImage = String(reader.result);
    };

    //  inicializamos la el archivo a subir
    this.imageUpload = image;
  }


  cambiarImagen() {

    //  llamamos a nuestro servicio para subir la imagen
    this.userService.updateImage( this.imageUpload, this.user.id );
    //  luego de subida la imagen vaciamos el archivo del formulario
  }

}
