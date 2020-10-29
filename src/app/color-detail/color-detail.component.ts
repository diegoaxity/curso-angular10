import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ColorsService } from '../services/colors.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.css']
})
export class ColorDetailComponent implements OnInit {
  title = '';
  id;
  isLoading = false;
  formColor: FormGroup;

  constructor(
    private fb: FormBuilder,
    private colors: ColorsService,
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute) {

    this.route.params.subscribe(p => {
      if (p.id) {
        this.id = p.id;
        this.title = 'Editar elemento';
        console.log(p.id);
        console.log('EDICION!!');
        this.colors.getColor(p.id).subscribe(res => {
          this.formColor.patchValue(res);
        }, err => {
          this.data.setMessage('Lo sentimos, ocurrió un error al obtener la información');
        });
      } else {
        this.title = 'Crear elemento';
        console.log('ALTA!!');
      }
    });

    this.formColor = this.fb.group({
      name: ['', Validators.required],
      hex: ['', Validators.required],
      pantone: ['', Validators.required],
      num: ['', Validators.required],
      active: [false, Validators.required]
    });

    this.data.getLoading().subscribe(loading => {
      this.isLoading = loading;
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    const dataColor = this.formColor.value;

    if (this.id) {
      this.data.setLoading(true);
      this.colors.editColor(this.id, dataColor).subscribe(res => {
        console.log(res);
        this.data.setLoading(false);
        this.data.setMessage('Los datos se enviaron correctamente');
        this.router.navigate(['colors']);
      }, err => {
        console.log(err);
        this.data.setLoading(false);
        this.data.setMessage('Lo sentimos, ocurrió un error');
      });
    } else {
      this.data.setLoading(true);
      this.colors.createColor(dataColor).subscribe(res => {
        console.log(res);
        this.data.setLoading(false);
        this.data.setMessage('Los datos se enviaron correctamente');
        this.router.navigate(['colors']);
      }, err => {
        console.log(err);
        this.data.setLoading(false);
        this.data.setMessage('Lo sentimos, ocurrió un error');
      });
    }
  }
}
