import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Message } from '../../models/index';
import { UserService } from '../../services/index';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public messages: Message[] = [];
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getMessages().subscribe(
      data => {
        this.messages = data.json().messages;
      },
      error => {
        // this.snackBar.open('Ошибка загрузки данных.', 'Закрыть', {
        //     duration: 2000,
        //});
      }
    );
  }

}
