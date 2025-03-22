import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  standalone: false,
})
export class FormModalComponent {

  @ViewChild(IonModal) modal!: IonModal;

  @Input() title!: string;
  @Input() metadata!: any;

  @Output() saved = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();

  model!: any;
  isModalOpen = false;

  setOpen(isOpen: boolean, model?: Record<string, any>) {
    if (isOpen) {
      this.model = model;
    }
    this.isModalOpen = isOpen;
  }

  cancel() {
    this.setOpen(false);
  }

  onSubmit(formData: any) {
    this.saved.emit(formData);
    this.setOpen(false);
  }

  onDelete() {
    this.deleted.emit(this.model);
    this.setOpen(false);
  }
}
