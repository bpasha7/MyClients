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
  public busy: boolean;
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
          this.userService.responseErrorHandle(error);
        }
      );
    }
  }

  loadMessages() {
    this.busy = true;
    this.userService.getMessages().subscribe(
      data => {
        this.messages = data.json().messages;
        this.busy = false;
      },
      error => {
        this.busy = false;
        this.userService.responseErrorHandle(error);
      }
    );
  }

}
