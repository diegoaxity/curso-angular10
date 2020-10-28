import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular10-course';
  isLoading = false;

  constructor(private data: DataService, private snack: MatSnackBar) {
    this.data.getMessage().subscribe(msg => {
      this.snack.open(msg, null, {
        duration: 2000
      });
    });

    this.data.getLoading().subscribe(x => {
      this.isLoading = x;
    });
  }
}
