import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessagePreviewComponent } from '../modals/index';
import { Message } from '../../models/index';
import { UserService } from '../../services/index';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public messages: Message[] = [];
  public unread = 0;
  public today: Date;
  constructor(
    public messageDialog: MatDialog,
    private userService: UserService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const now = new Date();
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.loadMessages();
    this.userService.notifyMenu('Новости');
    // this.unread = this.countUnread();
  }

  countUnread() {
    let count = 0;
    this.messages.forEach(message => {
      if (!message.isRead) {
        count++;
      }
    });
    this.unread = count;
    return count;
  }

  checkStatus(message: Message) {
    if (!message.isRead) {
      return new Date(message.date).getTime() > this.today.getTime() ? 0 : 1;
    }
    return 2;
    // if(!message.isRead && message.date.getTime() < this.today) {
    //   retur
    // }
  }

  messageClick(message: Message) {
    const dialogRef = this.messageDialog.open(MessagePreviewComponent, {
      width: '250px',
      data: {
        from: message.from,
        text: message.text,
        mode: 'message'
      }
    });
    if (!message.isRead) {
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
        if (error.status === 401) {
          this.userService.goLogin();
          this.snackBar.open('Пароль истек!', 'Закрыть', {
            duration: 2000,
          });
        } else {
          this.snackBar.open(error._body, 'Закрыть', {
            duration: 2000,
          });
        }
      }
    );
  }

}
