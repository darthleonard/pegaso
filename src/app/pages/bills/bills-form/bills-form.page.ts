import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormComponent } from 'src/app/components/form/form/form.component';
import { Bill } from '../bill';
import { billFormMetadata } from './bills-form.metadata';

@Component({
  selector: 'app-bills-form',
  templateUrl: './bills-form.page.html',
  providers: [DataService],
  standalone: false,
})
export class BillsFormPage implements OnInit {
  @ViewChild(FormComponent) form!: FormComponent;

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly dataService: DataService<Bill>,
    private readonly alertService: AlertService
  ) {
    this.dataService.init('bills');
  }

  metadata = billFormMetadata;
  title = '';
  isEditing = false;
  bill: Bill | null = null;

  ngOnInit() {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    let titlePrefix = 'Create';
    this.bill = {} as Bill;
    if (navigationState && navigationState['bill']) {
      this.bill = navigationState['bill'];
      this.isEditing = true;
      titlePrefix = 'Edit';
    }
    this.title = `${titlePrefix} Monthly Payment`;
  }

  hasChanges(): boolean {
    return this.form.hasChanges();
  }

  showUnsavedChangesAlert(): Promise<boolean> {
    return this.alertService.presentAlert({
      header: 'You have unsaved changes',
      message: 'Do you want to discard changes?',
    });
  }

  async onFormSubmit(formData: any) {
    try {
      const billData = formData;
      billData.month = new Date(billData.month).toISOString().split('T')[0];
      await this.dataService.saveRecord(billData);
      this.form.form.reset();
      this.location.back();
    } catch (error: any) {
      this.form.error = `Error saving bill: ${error.error.text}`;
    }
  }

  async onDelete() {
    if (!this.bill?.id) {
      return;
    }
    try {
      await this.dataService.deleteRecord(this.bill);
      this.form.form.reset();
      this.location.back();
    } catch (error: any) {
      this.form.error = `Error deleting bill ${error.error.message}`;
    }
  }
}
