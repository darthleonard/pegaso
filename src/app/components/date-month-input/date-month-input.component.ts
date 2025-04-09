import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-month-input',
  templateUrl: './date-month-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateMonthInputComponent,
      multi: true,
    },
  ],
  standalone: false,
})
export class DateMonthInputComponent implements ControlValueAccessor {
  constructor(private datePipe: DatePipe) {}

  @Input() readonly = false;

  dateInput: string | undefined | null;
  onChange?: (value: any) => void;

  writeValue(value: any) {
    this.dateInput =
      value == null ? '' : this.datePipe.transform(value, 'MMMM y');
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: any) => void) {}

  update(event: any) {
    const date = this.formatMonthYearOnly(
      event.detail.value ? new Date(event.detail.value) : new Date()
    );
    this.writeValue(date);
    if (this.onChange) {
      this.onChange(date);
    }
  }

  private formatMonthYearOnly(date: Date): Date {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = 1;

    return new Date(`${year}-${month}-${day}`);
  }
}
