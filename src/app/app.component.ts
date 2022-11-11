import { Component } from '@angular/core';
import { LoaderService } from './shared/components/loader/loader.service';
import { AlertService } from './shared/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'FRONTENDQyN';

  constructor(
    public alertService: AlertService,
    public loaderService: LoaderService

  ) {

  }



}
