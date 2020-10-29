import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ColorsService } from '../services/colors.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {
  dataSource = [];
  displayedColumns = ['name', 'hex', 'pantone', 'num', 'active', 'actions'];

  constructor(private colors: ColorsService, private data: DataService, private router: Router, private snack: MatSnackBar) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  loadData(): void {
    this.data.setLoading(true);
    this.colors.getColors().subscribe(res => {
      this.dataSource = res;
      this.data.setLoading(false);
    }, err => {
      this.data.setMessage('Lo sentimos, no se pudo consultar la información');
      this.data.setLoading(false);
    });
  }

  edit(id: string): void {
    this.router.navigate(['color-detail', id]);
  }

  delete(id: string): void {
    const confirm = this.snack.open('¿Estas seguro de eliminar el registro?', 'Si', {
      duration: 3000
    });
    confirm.onAction().subscribe(() => {
      this.data.setLoading(true);
      this.colors.deleteColor(id).subscribe(res => {
        console.log(res);
        this.data.setMessage('El registro se ha eliminado correctamente');
        this.data.setLoading(false);
        this.loadData();
      }, err => {
        console.log(err);
        this.data.setMessage('Lo sentimos, el registro no se pudo eliminar');
        this.data.setLoading(false);
      });
    });
  }
}
