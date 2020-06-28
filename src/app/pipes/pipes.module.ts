import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { NamePipe } from './name.pipe';



@NgModule({
  declarations: [
    ImagePipe,
    NamePipe
  ],
  exports: [
    ImagePipe,
    NamePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
