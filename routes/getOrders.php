<?phpheader('Content-Type: application/json');
error_reporting(-1);ini_set('display_errors', 'On');
include('connect.php');
$orders = mysqli_query($conexiune, "SELECT * FROM orders ORDER BY oid DESC");            if (!$orders) {                http_response_code(500);                echo json_encode('{"error": "Orders query failed!"}');                die();            }            $count = 0;            while ($line = mysqli_fetch_assoc($orders)) {
                    $ord[$count] = $line;                    $count++;            }
            http_response_code(200);
    		echo json_encode($ord);
?>
