CREATE TABLE cars (
    id CHAR(36) PRIMARY KEY,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_mod_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    make VARCHAR(100) NOT NULL,                       -- Marca (ej. Toyota)
    model VARCHAR(100) NOT NULL,                      -- Modelo (ej. Corolla)
    year INT CHECK (year >= 1886),                    -- Año del vehículo
    color VARCHAR(50),
    license_plate VARCHAR(20) UNIQUE,                 -- Placa
    vin VARCHAR(50) UNIQUE,                           -- Número de serie (Vehicle Identification Number)
    purchase_date DATE,                               -- Fecha de compra
    purchase_price DECIMAL(10,2),
    mileage INT,                                      -- Kilometraje actual
    fuel_type VARCHAR(50),                            -- Gasolina, Diésel, Eléctrico, etc.
    transmission_type VARCHAR(50),                    -- Automática, Manual
    has_insurance BOOLEAN DEFAULT FALSE,
    insurance_provider VARCHAR(100),
    insurance_policy_number VARCHAR(100),
    notes TEXT,
);
