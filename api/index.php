<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'core/database.php';
require_once 'core/object-mapper.php';
require_once 'core/router.php';
require_once 'controllers/bill-controller.php';
require_once 'controllers/fuel-controller.php';

$database = new DB();
$db = $database->getConnection();

$router = new Router();

$billController = new BillController($db);
$router->add('GET', '/api/index.php/bills', [$billController, 'getAllBills']);
$router->add('GET', '/api/index.php/bills/(:id)', [$billController, 'getBillById']);
$router->add('POST', '/api/index.php/bills', [$billController, 'createBill']);
$router->add('PUT', '/api/index.php/bills', [$billController, 'updateBill']);
$router->add('DELETE', '/api/index.php/bills', [$billController, 'deleteBill']);
$router->add('GET', '/api/index.php/bills/filter', [$billController, 'getBillsByDate']);

$fuelController = new FuelController($db);
$router->add('GET', '/api/index.php/fuel', [$fuelController, 'getAllFuels']);
$router->add('GET', '/api/index.php/fuel/(:id)', [$fuelController, 'getFuelById']);
$router->add('POST', '/api/index.php/fuel', [$fuelController, 'createFuel']);
$router->add('PUT', '/api/index.php/fuel', [$fuelController, 'updateFuel']);
$router->add('DELETE', '/api/index.php/fuel', [$fuelController, 'deleteFuel']);
$router->add('GET', '/api/index.php/fuel/filter', [$fuelController, 'getFuelsByDate']);

// to add user controller
// $userController = new UserController($db);
// $router->add('GET', '/users', [$userController, 'getAllUsers']);
// $router->add('POST', '/users', [$userController, 'createUser']);
// $router->add('GET', '/users/id', [$userController, 'getUserById']);

try {
    $router->dispatch();
} catch(Exception $e) {
    echo $e;
}
?>
