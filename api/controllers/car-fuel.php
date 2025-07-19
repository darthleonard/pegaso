<?php
class CarFuel {
    private $conn;
    private $table_name = "car_fuel";

    public $id;
    public $car_id;
    public $refill_date;
    public $fuel_amount;
    public $total_cost;
    public $odometer;
    public $notes;
    public $creation_date;
    public $last_mod_date;
    public $errorMessage;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO {$this->table_name} 
            (id, car_id, refill_date, fuel_amount, total_cost, odometer, notes)
            VALUES (:id, :car_id, :refill_date, :fuel_amount, :total_cost, :odometer, :notes)";
        
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
        $query = "SELECT * FROM {$this->table_name} ORDER BY refill_date DESC";
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
            car_id = :car_id,
            refill_date = :refill_date,
            fuel_amount = :fuel_amount,
            total_cost = :total_cost,
            odometer = :odometer,
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
