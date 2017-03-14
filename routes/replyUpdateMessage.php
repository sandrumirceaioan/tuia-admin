<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$data = json_decode(file_get_contents("php://input"));

if ($data->type === 'update') {
    $upd_status = mysqli_query($conexiune, "UPDATE contact_table SET the_status=0 WHERE the_id=".intval($data->the_id)."");
    	if (mysqli_affected_rows($conexiune) > 0) {
    		http_response_code(200);
    		echo json_encode('{"success": "Message marked as read!"}');
    	} else {
    		http_response_code(500);
            echo json_encode('{"error": "Message update failed!"}');
    	}
    die();
}

if ($data->type === 'reply') {
    $upd_status = mysqli_query($conexiune, "UPDATE contact_table SET the_status=0 WHERE the_id=".intval($data->the_id)."");
    	if (mysqli_affected_rows($conexiune) > 0) {


			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
			$headers .= "From: contact@tuiasmaragd.ro" . "\r\n" .
			"Reply-To: sandrumirceaioan@gmail.com" . "\r\n" .
			"X-Mailer: PHP/" . phpversion();
            $message = "
            <table>
            <tr>
            <td><img src=\"http://www.tuiasmaragd.ro/manage/assets/logo-tuia-small-black.png\"><br /></td>
            </tr>
            <tr>
                <td>In legatura cu mesajul trimis:
                <i><small>\".$data->the_message.\"</small></i></td>
            </tr>
            <tr>
                <br><hr><br>
            </tr>
            <tr>
            <td>".$data->the_name.", <br />".$data->replyMessage."</td>
            </tr>
            <tr>
                <br><hr><br>
            </tr>
            <tr>
            <small>www.tuiasmaragd.ro | Producator Thuja Occidentalis Smaragd in Romania</small>
            </tr>
            </table>
            ";
            mail($data->the_email,$data->replyTitle,$message,$headers);


    		http_response_code(200);
    		echo json_encode('{"success": "Message marked as read!"}');
    	} else {
    		http_response_code(500);
            echo json_encode('{"error": "Message update failed!"}');
    	}
    die();
}

http_response_code(500);
echo json_encode('{"error": "Something went wrong!"}');


?>
