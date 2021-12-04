import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header-general',
  templateUrl: './header-general.component.html',
  styleUrls: ['./header-general.component.css']
})
export class HeaderGeneralComponent implements OnInit {

  user: User;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {

    this.user = this.userService.user;
  }

}
