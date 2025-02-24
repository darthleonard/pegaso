import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: false,
})
export class FormComponent implements OnInit {
  @Input() model: any = {};
  @Input() metadata!: {
    field: string;
    label: string;
    type: string;
    validators?: string[];
  }[];

  @Output() formSubmitted = new EventEmitter<any>();

  form: FormGroup;
  isEditing = false;
  error: any;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.buildForm();
  }

  hasChanges(): boolean {
    return this.form.dirty;
  }

  buildForm() {
    this.metadata.forEach((field) => {
      const control = this.formBuilder.control(
        this.model[field.field],
        this.getValidators(field.validators)
      );
      this.form.addControl(field.field, control);
    });
  }

  getValidators(validators?: string[]) {
    const formValidators: any[] = [];

    validators?.forEach((validator) => {
      if (validator === 'required') {
        formValidators.push(Validators.required);
      } else if (validator === 'email') {
        formValidators.push(Validators.email);
      } else if (validator === 'number') {
        formValidators.push(Validators.pattern('^[0-9]+$'));
      }
    });

    return formValidators;
  }

  onSubmit() {
    this.error = null;
    if (this.form.valid) {
      this.formSubmitted.emit({
        ...this.model,
        ...this.form.value,
      });
    } else {
      this.error = 'Form is invalid';
    }
  }
}
