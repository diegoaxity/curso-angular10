import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.css']
})
export class ColorDetailComponent implements OnInit {
  formColor: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formColor = this.fb.group({
      name: ['', Validators.required],
      hex: ['', Validators.required],
      pantone: ['', Validators.required],
      num: ['', Validators.required],
      active: [false, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    console.log(this.formColor.value);
  }
}
