<?php
class Bill {
    private $conn;
    private $table_name = "bills";

    public $id;
    public $creation_date;
    public $last_mod_date;
    public $month;
    public $house;
    public $cable;
    public $water;
    public $electricity;
    public $gas;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " (id, month, house, cable, water, electricity, gas) 
                  VALUES (:id, :month, :house, :cable, :water, :electricity, :gas)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":month", $this->month);
        $stmt->bindParam(":house", $this->house);
        $stmt->bindParam(":cable", $this->cable);
        $stmt->bindParam(":water", $this->water);
        $stmt->bindParam(":electricity", $this->electricity);
        $stmt->bindParam(":gas", $this->gas);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name ." ORDER BY month DESC";
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
            $this->month = $row['month'];
            $this->house = $row['house'];
            $this->cable = $row['cable'];
            $this->water = $row['water'];
            $this->electricity = $row['electricity'];
            $this->gas = $row['gas'];
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
                  month = :month,
                  house = :house,
                  cable = :cable,
                  water = :water,
                  electricity = :electricity,
                  gas = :gas
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":month", $this->month);
        $stmt->bindParam(":house", $this->house);
        $stmt->bindParam(":cable", $this->cable);
        $stmt->bindParam(":water", $this->water);
        $stmt->bindParam(":electricity", $this->electricity);
        $stmt->bindParam(":gas", $this->gas);
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
