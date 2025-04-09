import { EditorType } from "src/app/components/form/form-metadata";

export const fuelFormMetadata = [
  {
    field: 'fill_date',
    label: 'Fecha',
    type: EditorType.Datetime,
    validators: ['required'],
  },
  {
    field: 'total',
    label: 'Total',
    type: EditorType.Number,
    validators: ['required'],
  },
  {
    field: 'fuel_amount',
    label: 'Cantidad (lt)',
    type: EditorType.Number,
    validators: ['required'],
  },
  {
    field: 'odometer',
    label: 'Kilometraje',
    type: EditorType.Number,
  },
];
