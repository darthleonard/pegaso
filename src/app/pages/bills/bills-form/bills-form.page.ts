import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bill } from '../bill';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bills-form',
  templateUrl: './bills-form.page.html',
  standalone: false,
})
export class BillsFormPage implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly crudService: CrudService<Bill>
  ) {
    this.createForm();
  }

  title = '';
  billForm: FormGroup = new FormGroup({});
  bill: Bill | null = null;

  ngOnInit() {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    let titlePrefix = 'Create';
    if (navigationState && navigationState['bill']) {
      this.bill = navigationState['bill'];
      if (this.bill) {
        this.billForm.patchValue(this.bill);
        titlePrefix = 'Edit';
      }
    }
    this.title = `${titlePrefix} Monthly Payments`;
  }

  dateChange(event: any) {
    const date = event.detail.value ? new Date(event.detail.value) : new Date();
    const monthName = this.toPascalCase(
      date.toLocaleString('default', { month: 'long' })
    );
    const newDate = `${monthName} ${date.getFullYear()}`;

    if (this.billForm.get('month')?.value !== newDate) {
      this.billForm.patchValue({ month: `${monthName} ${date.getFullYear()}` });
    }
  }

  onSubmit() {
    if (this.billForm.valid) {
      const billData = this.billForm.value;
      if (this.bill && this.bill.id) {
        console.log('Editing bill:', billData);
        this.crudService.updateAsync(`${environment.apiUrl}/bills`, billData);
      } else {
        console.log('New bill submitted:', billData);
        this.crudService.createAsync(`${environment.apiUrl}/bills`, billData);
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

  private toPascalCase(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+|_)/g, (match, index) =>
        index === 0 ? match.toUpperCase() : match.toLowerCase()
      )
      .replace(/\s+/g, '') // Remove spaces
      .replace(/_/g, ''); // Remove underscores
  }
}
