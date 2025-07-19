<?php
require_once 'car-fuel.php';

class CarFuelController {
    private $fuel;

    public function __construct($db) {
        $this->fuel = new CarFuel($db);
    }

    public function getAll() {
        $stmt = $this->fuel->read();
        $data = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
        }
        echo json_encode($data);
    }

    public function getOne() {
        $id = $_GET['id'] ?? null;
        if ($id) {
            $this->fuel->id = $id;
            $this->fuel->readOne();
            echo json_encode($this->fuel);
        } else {
            echo json_encode(["message" => "Fuel record ID is required"]);
        }
    }

    public function create() {
        $data = json_decode(file_get_contents("php://input"));
        $this->fuel = ObjectMapper::fromArray((array)$data, $this->fuel);
        if ($this->fuel->create()) {
            echo json_encode($this->fuel);
        } else {
            echo json_encode(["message" => "Failed to create record. " . $this->fuel->errorMessage]);
        }
    }

    public function update() {
        $data = json_decode(file_get_contents("php://input"));
        $this->fuel = ObjectMapper::fromArray((array)$data, $this->fuel);
        if ($this->fuel->update()) {
            echo json_encode($this->fuel);
        } else {
            echo json_encode(["message" => "Failed to update fuel record."]);
        }
    }

    public function delete() {
        $data = json_decode(file_get_contents("php://input"));
        $this->fuel->id = $data->id;
        if ($this->fuel->delete()) {
            echo json_encode(["message" => "Fuel record deleted."]);
        } else {
            echo json_encode(["message" => "Failed to delete fuel record."]);
        }
    }
}
?>
