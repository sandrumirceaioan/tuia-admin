<?phpheader('Content-Type: application/json');error_reporting(-1);ini_set('display_errors', 'On');include('connect.php');
$data = json_decode(file_get_contents("php://input"));

// login empty username or/and password
if (!$data->username || !$data->password) {	http_response_code(401);	echo json_encode('{"error": "Please fill your username or password !"}');	die();}
$user = $data->username;$pass = md5($data->password);
$users = mysqli_query($conexiune, "SELECT * FROM admin WHERE username='".$user."' AND password='".$pass."'");
            $usr = mysqli_fetch_assoc($users);
			if (!$usr) {				http_response_code(401);				echo json_encode('{"error": "Wrong username or password !"}');				die();			}
				http_response_code(200);
				echo json_encode($usr);
?>
