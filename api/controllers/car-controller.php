<?php
require_once 'car.php';

class CarController {
    private $car;

    public function __construct($db) {
        $this->car = new Car($db);
    }

    public function getAllCars() {
        $stmt = $this->car->read();
        $data = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
        }
        echo json_encode($data);
    }

    public function getCarById() {
        $id = $_GET['id'] ?? null;
        if ($id) {
            $this->car->id = $id;
            $this->car->readOne();
            echo json_encode($this->car);
        } else {
            echo json_encode(["message" => "Car ID is required"]);
        }
    }

    public function createCar() {
        $data = json_decode(file_get_contents("php://input"));
        $this->car = ObjectMapper::fromArray((array)$data, $this->car);
        if ($this->car->create()) {
            echo json_encode($this->car);
        } else {
            echo json_encode(["message" => "Failed to create car. " . $this->car->errorMessage]);
        }
    }

    public function updateCar() {
        $data = json_decode(file_get_contents("php://input"));
        $this->car = ObjectMapper::fromArray((array)$data, $this->car);
        if ($this->car->update()) {
            echo json_encode($this->car);
        } else {
            echo json_encode(["message" => "Failed to update car."]);
        }
    }

    public function deleteCar() {
        $data = json_decode(file_get_contents("php://input"));
        $this->car->id = $data->id;
        if ($this->car->delete()) {
            echo json_encode(["message" => "Car deleted successfully."]);
        } else {
            echo json_encode(["message" => "Failed to delete car."]);
        }
    }
}
?>
