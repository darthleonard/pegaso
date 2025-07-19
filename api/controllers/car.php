<?php
class Car {
    private $conn;
    private $table_name = "cars";

    public $id;
    public $make;
    public $model;
    public $year;
    public $color;
    public $license_plate;
    public $vin;
    public $purchase_date;
    public $purchase_price;
    public $mileage;
    public $fuel_type;
    public $transmission_type;
    public $notes;
    public $creation_date;
    public $last_mod_date;
    public $errorMessage;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO {$this->table_name} 
            (id, make, model, year, color, license_plate, vin, purchase_date, purchase_price, mileage, fuel_type, transmission_type, notes)
            VALUES (:id, :make, :model, :year, :color, :license_plate, :vin, :purchase_date, :purchase_price, :mileage, :fuel_type, :transmission_type, :notes)";
        
        $stmt = $this->conn->prepare($query);
        $params = ObjectMapper::toArray($this);

        try {
            return $stmt->execute($params);
        } catch (PDOException $e) {
            $this->errorMessage = $e->getMessage();
            return false;
        }
    }

    public function read() {
        $query = "SELECT * FROM {$this->table_name} ORDER BY creation_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne() {
        $query = "SELECT * FROM {$this->table_name} WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) ObjectMapper::fromArray($row, $this);
    }

    public function update() {
        $query = "UPDATE {$this->table_name} SET
            make = :make,
            model = :model,
            year = :year,
            color = :color,
            license_plate = :license_plate,
            vin = :vin,
            purchase_date = :purchase_date,
            purchase_price = :purchase_price,
            mileage = :mileage,
            fuel_type = :fuel_type,
            transmission_type = :transmission_type,
            notes = :notes
            WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $params = ObjectMapper::toArray($this);
        return $stmt->execute($params);
    }

    public function delete() {
        $query = "DELETE FROM {$this->table_name} WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        return $stmt->execute();
    }
}
?>
