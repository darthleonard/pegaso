<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$headers = getallheaders();
$apiKey = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';
if ($apiKey !== 'MY_SECRET_API_KEY') {
    header('HTTP/1.1 403 Forbidden');
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

require_once 'core/database.php';
require_once 'core/object-mapper.php';
require_once 'core/router.php';

$database = new DB();
$db = $database->getConnection();
$router = new Router();

$endpoint = explode('/', $_SERVER['REQUEST_URI'])[3];
switch($endpoint) {
    case 'bills':
        require_once 'controllers/bill-controller.php';
        $billController = new BillController($db);
        $router->add('GET', '/api/index.php/bills', [$billController, 'getAllBills']);
        $router->add('GET', '/api/index.php/bills/(:id)', [$billController, 'getBillById']);
        $router->add('POST', '/api/index.php/bills', [$billController, 'createBill']);
        $router->add('PUT', '/api/index.php/bills', [$billController, 'updateBill']);
        $router->add('DELETE', '/api/index.php/bills', [$billController, 'deleteBill']);
        $router->add('GET', '/api/index.php/bills/filter', [$billController, 'getBillsByDate']);
        break;
    case 'fuel':
        require_once 'controllers/fuel-controller.php';
        $fuelController = new FuelController($db);
        $router->add('GET', '/api/index.php/fuel', [$fuelController, 'getAllFuels']);
        $router->add('GET', '/api/index.php/fuel/(:id)', [$fuelController, 'getFuelById']);
        $router->add('POST', '/api/index.php/fuel', [$fuelController, 'createFuel']);
        $router->add('PUT', '/api/index.php/fuel', [$fuelController, 'updateFuel']);
        $router->add('DELETE', '/api/index.php/fuel', [$fuelController, 'deleteFuel']);
        $router->add('GET', '/api/index.php/fuel/filter', [$fuelController, 'getFuelsByDate']);
        break;
    case 'shoppings':
        require_once 'controllers/shoppings-controller.php';
        $shoppingsController = new ShoppingsController($db);
        $router->add('GET', '/api/index.php/shoppings', [$shoppingsController, 'getAllShoppings']);
        $router->add('POST', '/api/index.php/shoppings', [$shoppingsController, 'saveShopping']);
        $router->add('PUT', '/api/index.php/shoppings', [$shoppingsController, 'saveShopping']);
        break;
    default:
        http_response_code(404);
        die(json_encode(["message" => "Endpoint not found"]));
}

try {
    $router->dispatch();
} catch(Exception $e) {
    echo $e;
}
?>
