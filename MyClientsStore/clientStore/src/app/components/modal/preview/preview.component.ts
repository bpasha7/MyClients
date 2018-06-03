import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabsModule } from '@angular/material';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  public title = '';
  public text = '';
  public imageSrc: string;
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  constructor(
    public dialogRef: MatDialogRef<PreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
        this.text = data.text;
        this.title = data.title;
        this.imageSrc = data.src;
      }
    }


  }
