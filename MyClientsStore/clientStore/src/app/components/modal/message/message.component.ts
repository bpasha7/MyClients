import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Message } from '../../../models/message';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  public message: Message;
  public contacts = '';
  public who = '';
  public inProc = false;
  constructor(
    public snackBar: MatSnackBar,
    private storeService: StoreService,
    public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = new Message();
    this.message.storeName = data.storeName;
  }

  ngOnInit() {
  }
  send() {
    this.inProc = true;
    this.message.from = this.who + '. Контакты: ' + this.contacts;
    this.message.text;
    this.storeService.sendMessage(this.message).subscribe(
      data => {
        this.inProc = false;
        this.snackBar.open('Сообщение отправлено!', 'Закрыть', {
          duration: 2000,
        });
        this.dialogRef.close(1);
      },
      error => {
        this.inProc = false;
        this.snackBar.open('Ошибка отправки!', 'Закрыть', {
          duration: 2000,
        });
        //console.error(error);
      }
    );
  }

}
