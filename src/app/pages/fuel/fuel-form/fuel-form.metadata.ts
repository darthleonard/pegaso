export const fuelFormMetadata = [
  {
    field: 'fill_date',
    label: 'Fecha',
    type: 'datetime',
    validators: ['required'],
  },
  {
    field: 'total',
    label: 'Total',
    type: 'number',
    validators: ['required'],
  },
  {
    field: 'fuel_amount',
    label: 'Cantidad (lt)',
    type: 'number',
  },
  {
    field: 'odometer',
    label: 'Kilometraje',
    type: 'number',
  },
];
