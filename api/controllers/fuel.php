<?php
class Fuel {
    private $conn;
    private $table_name = "fuel";

    public $id;
    public $creation_date;
    public $last_mod_date;
    public $fill_date;
    public $total;
    public $fuel_amount;
    public $odometer;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " (id, fill_date, total, fuel_amount, odometer) 
                  VALUES (:id, :fill_date, :total, :fuel_amount, :odometer)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":fill_date", $this->fill_date);
        $stmt->bindParam(":total", $this->total);
        $stmt->bindParam(":fuel_amount", $this->fuel_amount);
        $stmt->bindParam(":odometer", $this->odometer);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name ." ORDER BY fill_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id LIMIT 0,1";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $this->creation_date = $row['creation_date'];
            $this->last_mod_date = $row['last_mod_date'];
            $this->fill_date = $row['fill_date'];
            $this->total = $row['total'];
            $this->fuel_amount = $row['fuel_amount'];
            $this->odometer = $row['odometer'];
        }
    }

    public function readByDate($date) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE last_mod_date > :date";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":date", $date);
        $stmt->execute();
        return $stmt;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " SET 
                  fill_date = :fill_date,
                  total = :total,
                  fuel_amount = :fuel_amount,
                  odometer = :odometer
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":fill_date", $this->fill_date);
        $stmt->bindParam(":total", $this->total);
        $stmt->bindParam(":fuel_amount", $this->fuel_amount);
        $stmt->bindParam(":odometer", $this->odometer);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
