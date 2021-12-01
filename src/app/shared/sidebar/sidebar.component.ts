import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  user: User;

  //  inyectamos nuestro servicio
  constructor( public userService: UserService, public sidebarService: SidebarService ) {
  }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

}
