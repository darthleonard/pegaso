import { ShoppingListItem } from "./shopping-list-item";

export type ShoppingList = {
   list_name: string,
   effective_date: Date,
   items_quantity: number,
   total: number,
   completed: number,
   items: ShoppingListItem[],
}