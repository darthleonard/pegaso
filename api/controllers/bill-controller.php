<?php
require_once 'bill.php';

class BillController {

    private $bill;

    public function __construct($db) {
        $this->bill = new Bill($db);
    }

    public function getAllBills() {
        $stmt = $this->bill->read();
        $bill_arr = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $bill_arr[] = $row;
        }
        echo json_encode($bill_arr);
    }

    public function getBillById() {
        $bill_id = $_GET['id'] ?? null;
        if ($bill_id) {
            $this->bill->id = $bill_id;
            $this->bill->readOne();
            echo json_encode($this->bill);
        } else {
            echo json_encode(["message" => "Bill ID is required"]);
        }
    }

    public function createBill() {
        $data = json_decode(file_get_contents("php://input"));
        $this->bill = ObjectMapper::fromArray((array) $data, $this->bill);
        
        if ($this->bill->create()) {
            echo json_encode($this->bill);
        } else {
            echo json_encode(["message" => "Failed to create bill.". $this->bill->errorMessage]);
        }
    }

    public function updateBill() {
        $data = json_decode(file_get_contents("php://input"));
        $this->bill = ObjectMapper::fromArray((array) $data, $this->bill);

        if ($this->bill->update()) {
            echo json_encode($this->bill);
        } else {
            echo json_encode(["message" => "Failed to update bill.". $this->bill->errorMessage]);
        }
    }

    public function deleteBill() {
        $data = json_decode(file_get_contents("php://input"));
        $this->bill->id = $data->id;

        if ($this->bill->delete()) {
            echo json_encode(["message" => "Bill deleted successfully."]);
        } else {
            echo json_encode(["message" => "Failed to delete bill.". $this->bill->errorMessage]);
        }
    }

    public function getBillsByDate() {
        $date = $_GET['date'] ?? null;
        if ($date) {
            $stmt = $this->bill->readByDate($date);
            $bill_arr = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $bill_arr[] = $row;
            }
            echo json_encode($bill_arr);
        } else {
            echo json_encode(["message" => "Date parameter is required"]);
        }
    }
}
?>
