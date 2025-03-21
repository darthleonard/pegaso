export const shoppingListItemFormMetadata = [
  {
    field: 'item_name',
    label: 'Producto',
    type: 'text',
    validators: ['required'],
  },
  {
    field: 'quantity',
    label: 'Cantidad',
    type: 'number',
  },
  {
    field: 'unit_price',
    label: 'Precio',
    type: 'number',
  },
  {
    field: 'notes',
    label: 'Notas',
    type: 'text',
  },
];
