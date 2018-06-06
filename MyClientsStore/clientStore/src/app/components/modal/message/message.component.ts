import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  constructor(
    private storeService: StoreService,
    public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = new Message();
    this.message.storeName = data.storeName;
    // this.message.from = '';
    // this.message.text = '';
  }

  ngOnInit() {
  }
  send() {
    this.message.text += 'Контакты: ' + this.contacts;
    this.storeService.sendMessage(this.message);
  }

}
