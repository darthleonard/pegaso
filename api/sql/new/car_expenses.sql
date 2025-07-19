CREATE TABLE car_expenses (
    id CHAR(36) PRIMARY KEY,
    car_id CHAR(36) NOT NULL,
    expense_date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,       -- Ej: "Gasolina", "Tenencia", "Multa", "Lavado"
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    receipt_url VARCHAR(255),
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (car_id) REFERENCES cars(id)
);
