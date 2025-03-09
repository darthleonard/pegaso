<?php
class ShoppingItem {
    private $conn;
    private $table_name = "shoppingItems";

    public $id;
    public $creation_date;
    public $last_mod_date;
    public $item_name;
    public $description;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " (id, item_name, description) 
                  VALUES (:id, :item_name, :description)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":item_name", $this->item_name);
        $stmt->bindParam(":description", $this->description);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name ." ORDER BY item_name ASC";
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
            $this->item_name = $row['item_name'];
            $this->description = $row['description'];
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
                  item_name = :item_name,
                  description = :description
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":item_name", $this->item_name);
        $stmt->bindParam(":description", $this->description);
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
