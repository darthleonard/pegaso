import { EditorType } from "src/app/components/form/form-metadata";

export const billFormMetadata = [
  {
    field: 'month',
    label: 'Fecha',
    type: EditorType.DateMonth,
    validators: ['required'],
  },
  {
    field: 'house',
    label: 'Renta',
    type: EditorType.Number,
  },
  {
    field: 'cable',
    label: 'Internet',
    type: EditorType.Number,
  },
  {
    field: 'water',
    label: 'Agua',
    type: EditorType.Number,
  },
  {
    field: 'electricity',
    label: 'Luz',
    type: EditorType.Number,
  },
  {
    field: 'gas',
    label: 'Gas',
    type: EditorType.Number,
  },
];
