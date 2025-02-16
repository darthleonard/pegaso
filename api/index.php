<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once 'core/database.php';
require_once 'core/router.php';
require_once 'controllers/bill-controller.php';

$database = new DB();
$db = $database->getConnection();

$router = new Router();

$billController = new BillController($db);

$router->add('GET', '/api/index.php/bills', [$billController, 'getAllBills']);
$router->add('GET', '/api/index.php/bills/id', [$billController, 'getBillById']);
$router->add('POST', '/api/index.php/bills', [$billController, 'createBill']);
$router->add('PUT', '/api/index.php/bills', [$billController, 'updateBill']);
$router->add('DELETE', '/api/index.php/bills', [$billController, 'deleteBill']);
$router->add('GET', '/api/index.php/bills/filter', [$billController, 'getBillsByDate']);

// to add user controller
// $userController = new UserController($db);
// $router->add('GET', '/users', [$userController, 'getAllUsers']);
// $router->add('POST', '/users', [$userController, 'createUser']);
// $router->add('GET', '/users/id', [$userController, 'getUserById']);

$router->dispatch();
?>
