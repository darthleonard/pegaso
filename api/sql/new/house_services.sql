CREATE TABLE house_services (
    id CHAR(36) PRIMARY KEY,
    house_id CHAR(36) NOT NULL,
    service_type VARCHAR(100) NOT NULL,     -- Ej: "Electricidad", "Agua", "Internet", "Gas"
    provider VARCHAR(100),                  -- CFE, Telmex, etc.
    account_number VARCHAR(100),            -- Número de contrato o cuenta
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATE,
    end_date DATE,
    notes TEXT,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (house_id) REFERENCES houses(id)
);
