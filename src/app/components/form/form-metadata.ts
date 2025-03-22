export type FormMetadata = {
  field: string;
  label: string;
  type: EditorType;
  readonly?: boolean;
  validators?: string[];
};

export enum EditorType {
  Text = 'text',
  Datetime = 'datetime',
  Number = 'number',
  Checkbox = 'checkbox',
  DateMonth = 'date-month',
}
