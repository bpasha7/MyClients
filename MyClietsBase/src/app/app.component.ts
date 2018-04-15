import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = 'My Clients';
  separator = ' :: ';
  title = this.appName;
  public constructor(private titleService: Title ) { }

  isLogined() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return true;
    }
    else {
      return false;
    }
  }

  // setTitel(section: string){
  //   this.title = this.appName + this.separator + section;
  // }
}
