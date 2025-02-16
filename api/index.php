<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once './core/database.php';
require_once './core/router.php';
require_once './controllers/bill-controller.php';

$database = new DB();
$db = $database->getConnection();

$router = new Router();

$billController = new BillController($db);

$router->add('GET', '/bills', [$billController, 'getAllBills']);
$router->add('GET', '/bills/id', [$billController, 'getBillById']);
$router->add('POST', '/bills', [$billController, 'createBill']);
$router->add('PUT', '/bills', [$billController, 'updateBill']);
$router->add('DELETE', '/bills', [$billController, 'deleteBill']);
$router->add('GET', '/bills/filter', [$billController, 'getBillsByDate']);

// to add user controller
// $userController = new UserController($db);
// $router->add('GET', '/users', [$userController, 'getAllUsers']);
// $router->add('POST', '/users', [$userController, 'createUser']);
// $router->add('GET', '/users/id', [$userController, 'getUserById']);

$router->dispatch();
?>
