<?php
require_once 'shopping-item.php';

class ShoppingItemsController {

    private $shoppingItem;

    public function __construct($db) {
        $this->shoppingItem = new ShoppingItem($db);
    }

    public function getAllshoppingItems() {
        $stmt = $this->shoppingItem->read();
        $shoppingItem_arr = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $shoppingItem_arr[] = $row;
        }
        echo json_encode($shoppingItem_arr);
    }

    public function createShoppingItem() {
        $data = json_decode(file_get_contents("php://input"));
        $this->shoppingItem = ObjectMapper::fromArray((array) $data, $this->shoppingItem);
        
        if ($this->shoppingItem->create()) {
            echo json_encode($this->shoppingItem);
        } else {
            echo json_encode(["message" => "Failed to create shoppingItem."]);
        }
    }

    public function updateShoppingItem() {
        $data = json_decode(file_get_contents("php://input"));
        $this->shoppingItem = ObjectMapper::fromArray((array) $data, $this->shoppingItem);

        if ($this->shoppingItem->update()) {
            echo json_encode($this->shoppingItem);
        } else {
            echo json_encode(["message" => "Failed to update shoppingItem."]);
        }
    }

    public function deleteShoppingItem() {
        $data = json_decode(file_get_contents("php://input"));
        $this->shoppingItem->id = $data->id;

        if ($this->shoppingItem->delete()) {
            echo json_encode(["message" => "shoppingItem deleted successfully."]);
        } else {
            echo json_encode(["message" => "Failed to delete shoppingItem."]);
        }
    }
}
?>
