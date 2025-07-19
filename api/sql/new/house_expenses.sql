CREATE TABLE house_expenses (
    id CHAR(36) PRIMARY KEY,
    house_id CHAR(36) NOT NULL,
    expense_date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,         -- Ej: "Mantenimiento", "Luz", "Agua", "Predial"
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    receipt_url VARCHAR(255),               -- (opcional) URL o ruta del comprobante
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (house_id) REFERENCES houses(id)
);
