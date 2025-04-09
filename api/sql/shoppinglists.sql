CREATE TABLE shoppingLists (
   id CHAR(36) PRIMARY KEY,
   creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   last_mod_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   list_name VARCHAR(255) NOT NULL,
   effective_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   items_quantity INT NOT NULL DEFAULT 0,
   total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
   completed TINYINT(1) NOT NULL DEFAULT FALSE
);
