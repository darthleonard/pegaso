CREATE TABLE car_maintenance (
    id CHAR(36) PRIMARY KEY,
    car_id CHAR(36) NOT NULL,
    maintenance_date DATE NOT NULL,
    type VARCHAR(100) NOT NULL,           -- Ej: "Cambio de aceite", "Afinación", etc.
    description TEXT,
    mileage INT,
    cost DECIMAL(10,2),
    workshop VARCHAR(100),
    next_due_date DATE,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (car_id) REFERENCES cars(id)
);
