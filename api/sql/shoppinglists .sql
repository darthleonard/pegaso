CREATE TABLE shoppingLists (
   id CHAR(36) PRIMARY KEY,
   creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   last_mod_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   list_name VARCHAR(255) NOT NULL,
   effective_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
