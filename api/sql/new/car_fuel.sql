CREATE TABLE car_fuel (
    id CHAR(36) PRIMARY KEY,
    car_id CHAR(36) NOT NULL,
    refill_date DATE NOT NULL,              -- Fecha de recarga del tanque
    fuel_amount DECIMAL(8,2) NOT NULL,      -- Cantidad de combustible (litros o galones)
    total_cost DECIMAL(10,2) NOT NULL,      -- Costo total pagado
    odometer INT NOT NULL,                  -- Lectura del odómetro al momento de cargar
    notes TEXT,

    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_mod_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (car_id) REFERENCES cars(id)
);