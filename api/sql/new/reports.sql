-- Gastos totales por casa
SELECT 
    h.name AS casa,
    SUM(e.amount) AS total_gastos
FROM house_expenses e
JOIN houses h ON e.house_id = h.id
GROUP BY h.id
ORDER BY total_gastos DESC;

--  Gastos mensuales por casa y categoría
SELECT 
    h.name AS casa,
    DATE_FORMAT(e.expense_date, '%Y-%m') AS mes,
    e.category,
    SUM(e.amount) AS total
FROM house_expenses e
JOIN houses h ON e.house_id = h.id
GROUP BY h.id, mes, e.category
ORDER BY h.name, mes;

-- Servicios activos por casa
SELECT 
    h.name AS casa,
    s.service_type,
    s.provider,
    s.account_number
FROM house_services s
JOIN houses h ON s.house_id = h.id
WHERE s.is_active = TRUE
ORDER BY h.name;

-- Mantenimientos realizados por casa
-SELECT 
    h.name AS casa,
    m.maintenance_date,
    m.description,
    m.provider,
    m.cost
FROM house_maintenance m
JOIN houses h ON m.house_id = h.id
ORDER BY m.maintenance_date DESC;


-- Próximos mantenimientos programados
SELECT 
    h.name AS casa,
    m.next_due_date,
    m.description,
    m.provider
FROM house_maintenance m
JOIN houses h ON m.house_id = h.id
WHERE m.next_due_date >= CURDATE()
ORDER BY m.next_due_date;

-- Gastos detallados por fecha y casa
SELECT 
    h.name AS casa,
    e.expense_date,
    e.category,
    e.amount,
    e.description
FROM house_expenses e
JOIN houses h ON e.house_id = h.id
ORDER BY e.expense_date DESC;

