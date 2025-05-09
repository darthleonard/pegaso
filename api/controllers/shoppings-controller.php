<?php

class ShoppingsController {
   private $conn;
   
   public function __construct($db) {
      $this->conn = $db;
   }

   public function getAllShoppings() {
      $stmt = $this->conn->prepare("SELECT id, list_name, effective_date, items_quantity, total, completed FROM shoppingLists");
      $stmt->execute();
      $shoppingLists = $stmt->fetchAll(PDO::FETCH_ASSOC);

      if (!$shoppingLists) {
         echo json_encode(['status' => 'error', 'message' => 'No shopping lists found']);
         exit;
      }

      foreach ($shoppingLists as &$shoppingList) {
         $shoppingList['completed'] = (bool)$shoppingList['completed'];
         $stmt = $this->conn->prepare(
            "SELECT si.id, i.item_name, i.description, si.unit_price, si.quantity, si.notes 
            FROM shoppingListItems si 
            JOIN shoppingItems i ON si.item_id = i.id 
            WHERE si.list_id = ?");
         $stmt->execute([$shoppingList['id']]);
         $shoppingList['items'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
      }

      echo json_encode($shoppingLists);
   }

   public function saveShopping() {
      $inputData = file_get_contents('php://input');
      $data = json_decode($inputData, true);

      if (isset($data['list_name']) && isset($data['items']) && is_array($data['items'])) {
          $listId = $data['id'];
          $stmt = $this->conn->prepare(
              "INSERT INTO shoppingLists (id, list_name, effective_date, items_quantity, total, completed) 
              VALUES (?, LOWER(?), ?, ?, ?, ?) 
              ON DUPLICATE KEY UPDATE 
                 list_name = LOWER(VALUES(list_name)),
                 effective_date = VALUES(effective_date),
                 items_quantity = VALUES(items_quantity),
                 total = VALUES(total),
                 completed = VALUES(completed)");
          $stmt->execute([$listId, $data['list_name'], $data['effective_date'], $data['items_quantity'], $data['total'], (int)$data['completed']]);

          foreach ($data['items'] as $item) {
              $stmt = $this->conn->prepare("SELECT id FROM shoppingItems WHERE item_name = LOWER(?)");
              $stmt->execute([strtolower($item['item_name'])]);
              $existingItem = $stmt->fetch(PDO::FETCH_ASSOC);
  
              if ($existingItem) {
                  $itemId = $existingItem['id'];
              } else {
                  $stmt = $this->conn->prepare(
                      "INSERT INTO shoppingItems (id, item_name, description) 
                      VALUES (UUID(), LOWER(?), LOWER(?))"
                  );
                  $stmt->execute([strtolower($item['item_name']), strtolower($item['description'] ?? '')]);
                  $itemId = $this->conn->lastInsertId();
              }

              $stmt = $this->conn->prepare(
                  "INSERT INTO shoppingListItems (id, list_id, item_id, quantity, unit_price, notes) 
                  VALUES (?, ?, ?, ?, ?, ?) 
                  ON DUPLICATE KEY UPDATE 
                     id = VALUES(id),
                     list_id = VALUES(list_id),
                     item_id = VALUES(item_id),
                     quantity = VALUES(quantity),
                     unit_price = VALUES(unit_price),
                     notes = VALUES(notes)");
              $stmt->execute([$item['id'], $listId, $itemId, $item['quantity'], $item['unit_price'] ?? null, $item['notes'] ?? null]);
          }
  
          echo json_encode(['status' => 'success', 'message' => 'Shopping list created successfully', 'list_id' => $listId]);
      } else {
          echo json_encode(['status' => 'error', 'message' => 'Invalid data received']);
      }
  }
}

?>
