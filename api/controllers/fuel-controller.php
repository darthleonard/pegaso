<?php
require_once 'fuel.php';

class FuelController {

    private $fuel;

    public function __construct($db) {
        $this->fuel = new Fuel($db);
    }

    public function getAllFuels() {
        $stmt = $this->fuel->read();
        $fuel_arr = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $fuel_arr[] = $row;
        }
        echo json_encode($fuel_arr);
    }

    public function getFuelById() {
        $fuel_id = $_GET['id'] ?? null;
        if ($fuel_id) {
            $this->fuel->id = $fuel_id;
            $this->fuel->readOne();
            echo json_encode($this->fuel);
        } else {
            echo json_encode(["message" => "Fuel ID is required"]);
        }
    }

    public function createFuel() {
        $data = json_decode(file_get_contents("php://input"));
        $this->fuel = ObjectMapper::fromArray((array) $data, $this->fuel);
        
        if ($this->fuel->create()) {
            echo json_encode($this->fuel);
        } else {
            echo json_encode(["message" => "Failed to create fuel."]);
        }
    }

    public function updateFuel() {
        $data = json_decode(file_get_contents("php://input"));
        $this->fuel = ObjectMapper::fromArray((array) $data, $this->fuel);

        if ($this->fuel->update()) {
            echo json_encode($this->fuel);
        } else {
            echo json_encode(["message" => "Failed to update fuel."]);
        }
    }

    public function deleteFuel() {
        $data = json_decode(file_get_contents("php://input"));
        $this->fuel->id = $data->id;

        if ($this->fuel->delete()) {
            echo json_encode(["message" => "fuel deleted successfully."]);
        } else {
            echo json_encode(["message" => "Failed to delete fuel."]);
        }
    }

    public function getFuelsByDate() {
        $date = $_GET['date'] ?? null;
        if ($date) {
            $stmt = $this->fuel->readByDate($date);
            $fuel_arr = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $fuel_arr[] = $row;
            }
            echo json_encode($fuel_arr);
        } else {
            echo json_encode(["message" => "Date parameter is required"]);
        }
    }
}
?>
