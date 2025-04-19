import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonSearchbar } from '@ionic/angular';
import { OfflineDataService } from 'src/app/services/offline-data.service';

@Component({
  selector: 'app-select-modal-input',
  templateUrl: './select-modal-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectModalInputComponent),
      multi: true,
    },
  ],
  standalone: false,
})
export class SelectModalInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild(IonSearchbar) private readonly searchbar!: IonSearchbar;

  constructor(private readonly offlineDataService: OfflineDataService) {}

  @Input() readonly = false;
  @Input() visibleField = '';
  @Input() tableName = '';
  @Output() itemSelected = new EventEmitter<Record<string, any>>();

  isModalOpen = false;
  selectedItem: any;
  onChange: (value: any) => void = () => {};
  onTouched?: any = () => {};

  items: Record<string, any>[] = [];
  filteredItems = [...this.items];

  ngOnInit(): void {
    this.offlineDataService.getAllRecords(this.tableName).then((r) => {
      this.items = r;
      this.filteredItems = [...this.items];
    });
  }

  open() {
    this.isModalOpen = true;
  }

  filterItems(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredItems = this.items.filter((item) =>
      item[this.visibleField].toLowerCase().includes(query)
    );
  }

  selectItem(item: any) {
    this.selectedItem = item[this.visibleField];
    this.onChange(item[this.visibleField]);
    this.itemSelected.emit(item);
    this.isModalOpen = false;
  }

  confirm() {
    this.selectedItem = this.searchbar.value;
    this.onChange(this.selectedItem);
    this.itemSelected.emit(this.selectedItem);
    this.isModalOpen = false;
  }

  cancel() {
    this.isModalOpen = false;
  }

  writeValue(value: any) {
    this.selectedItem = value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: any) => void) {
    this.onTouched = fn;
  }
}
