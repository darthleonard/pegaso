import { EditorType } from "src/app/components/form/form-metadata";

export const shoppingListFormMetadata = [
  {
    field: 'list_name',
    label: 'Nombre',
    type: EditorType.Text,
    validators: ['required'],
  },
  {
    field: 'effective_date',
    label: 'Fecha',
    type: EditorType.Datetime,
  },
  // {
  //   field: 'completed',
  //   label: 'Completada',
  //   type: EditorType.Checkbox,
  //   readonly: true,
  // }
];
