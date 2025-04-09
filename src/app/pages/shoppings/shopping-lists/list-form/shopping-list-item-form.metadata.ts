import { EditorType } from "src/app/components/form/form-metadata";

export const shoppingListItemFormMetadata = [
  {
    field: 'item_name',
    label: 'Producto',
    type: EditorType.SelectModal,
    selectOptions: {
      visibleField: 'item_name',
      tableName: 'shoppingItems'
    },
    validators: ['required'],
  },
  {
    field: 'quantity',
    label: 'Cantidad',
    type: EditorType.Number,
  },
  {
    field: 'unit_price',
    label: 'Precio',
    type: EditorType.Number,
  },
  {
    field: 'notes',
    label: 'Notas',
    type: EditorType.Text,
  },
];
