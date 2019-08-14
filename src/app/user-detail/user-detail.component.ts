import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {User} from '../user';
import {UserService} from '../user.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private location: Location,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getUser();
  }
  getUser(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.userService.getUser(userId).subscribe(user => this.user = user);
  }
  goBack(): void {
    this.location.back();
  }
  setStatus(): void {
    this.userService.setStatus(this.user);
  }
  setLastName(): void {
    this.userService.setLastName(this.user);
  }
  setFirstName(): void {
    this.userService.setFirstName(this.user);
  }
}
