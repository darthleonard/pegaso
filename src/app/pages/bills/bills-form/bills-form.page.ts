import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bill } from '../bill';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bills-form',
  templateUrl: './bills-form.page.html',
  providers: [DataService],
  standalone: false,
})
export class BillsFormPage implements OnInit {
  constructor(
    private readonly router: Router,
    private location: Location,
    private readonly fb: FormBuilder,
    private readonly crudService: CrudService<Bill>,
    private readonly dataService: DataService<Bill>
  ) {
    this.dataService.init('bills');
    this.createForm();
  }

  title = '';
  isEditing = false;
  billForm: FormGroup = new FormGroup({});
  bill: Bill | null = null;

  ngOnInit() {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    let titlePrefix = 'Create';
    if (navigationState && navigationState['bill']) {
      this.bill = navigationState['bill'];
      if (this.bill) {
        this.isEditing = true;
        this.billForm.patchValue(this.bill);
        titlePrefix = 'Edit';
      }
    }
    this.title = `${titlePrefix} Monthly Payment`;
  }

  async onSubmit() {
    if (this.billForm.valid) {
      try {
        const billData = this.billForm.value;
        await this.dataService.saveRecord(billData);
        this.location.back();
      } catch (error) {
        console.error('Error saving bill:', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  private createForm() {
    this.billForm = this.fb.group({
      cable: [null, Validators.min(0)],
      electricity: [null, Validators.min(0)],
      gas: [null, Validators.min(0)],
      house: [null, Validators.min(0)],
      id: [null],
      month: [null, Validators.required],
      water: [null, Validators.min(0)],
    });
  }
}
