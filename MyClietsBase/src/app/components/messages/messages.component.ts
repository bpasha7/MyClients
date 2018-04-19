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
  public today: Date;
  constructor(
    private userService: UserService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const now = new Date();
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.loadMessages();
  }

  checkStatus(message: Message) {
    if(!message.isRead) {
      return new Date(message.date).getTime() > this.today.getTime() ? 0 : 1;
    }
    return 2;
    // if(!message.isRead && message.date.getTime() < this.today) {
    //   retur
    // }
  }

  messageClick(message: Message) {
    if(!message.isRead) {
      this.userService.readMessage(message.id).subscribe(
        data => {
          message.isRead = true;
        },
        error => {
          this.snackBar.open(error._body, 'Закрыть', {
              duration: 2000,
          });
        }
      );
    }
  }

  loadMessages() {
    this.userService.getMessages().subscribe(
      data => {
        this.messages = data.json().messages;
      },
      error => {
        this.snackBar.open(error._body, 'Закрыть', {
            duration: 2000,
        });
      }
    );
  }

}
