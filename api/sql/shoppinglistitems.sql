CREATE TABLE shoppingListItems (
   id CHAR(36) PRIMARY KEY,
   creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   last_mod_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   list_id CHAR(36),
   item_id CHAR(36),
   quantity INT DEFAULT 1,
   unit_price DECIMAL(10, 2),
   notes TEXT,
   FOREIGN KEY (list_id) REFERENCES ShoppingLists(id),
   FOREIGN KEY (item_id) REFERENCES Items(id)
);
