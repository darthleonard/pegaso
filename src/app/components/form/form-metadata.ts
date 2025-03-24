export type FormMetadata = {
  field: string;
  label: string;
  type: EditorType;
  visibleField?: string; // for use on SelectModal
  readonly?: boolean;
  validators?: string[];
};

export enum EditorType {
  Text = 'text',
  Datetime = 'datetime',
  Number = 'number',
  Checkbox = 'checkbox',
  DateMonth = 'date-month',
  SelectModal = 'select-modal',
}
