import { EditorType } from "src/app/components/form/form-metadata";

export const shoppingItemFormMetadata = [
  {
    field: 'item_name',
    label: 'Nombre',
    type: EditorType.Text,
    validators: ['required'],
  },
  {
    field: 'description',
    label: 'Descripcion',
    type: EditorType.Text,
  },
];
