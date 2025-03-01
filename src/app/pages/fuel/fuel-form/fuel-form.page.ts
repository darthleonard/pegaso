import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormComponent } from 'src/app/components/form/form/form.component';
import { Fuel } from '../fuel';
import { fuelFormMetadata } from './fuel-form.metadata';

@Component({
  selector: 'app-fuel-form',
  templateUrl: './fuel-form.page.html',
  providers: [DataService],
  standalone: false,
})
export class FuelFormPage implements OnInit {
  @ViewChild(FormComponent) private readonly form!: FormComponent;

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly dataService: DataService<Fuel>,
    private readonly alertService: AlertService
  ) {
    this.dataService.init('fuel');
  }

  metadata = fuelFormMetadata;
  title = '';
  isEditing = false;
  fuel: Fuel | null = null;

  ngOnInit() {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    let titlePrefix = 'New';
    this.fuel = {} as Fuel;
    if (navigationState && navigationState['fuel']) {
      this.fuel = navigationState['fuel'];
      this.isEditing = true;
      titlePrefix = 'Edit';
    }
    this.title = `${titlePrefix} Fuel Refill`;
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
      const fuelData = formData;
      //fuelData.month = new Date(fuelData.month).toISOString().split('T')[0];
      await this.dataService.saveRecord(fuelData);
      this.form.form.reset();
      this.location.back();
    } catch (error: any) {
      this.form.error = `Error saving fuel: ${error.error.text}`;
    }
  }

  async onDelete() {
    if (!this.fuel?.id) {
      return;
    }
    try {
      await this.dataService.deleteRecord(this.fuel);
      this.form.form.reset();
      this.location.back();
    } catch (error: any) {
      this.form.error = `Error deleting fuel ${error.error.message}`;
    }
  }
}
