export const shoppingListFormMetadata = [
  {
    field: 'list_name',
    label: 'Nombre',
    type: 'text',
    validators: ['required'],
  },
  {
    field: 'effective_date',
    label: 'Fecha',
    type: 'datetime',
  },
  {
    field: 'items_quantity',
    label: 'Cantidad de Productos',
    type: 'number',
    readonly: true,
  },
  {
    field: 'total',
    label: 'Total',
    type: 'number',
    readonly: true,
  },
  {
    field: 'completed',
    label: 'Completada',
    type: 'checkbox',
    readonly: true,
  }
];
