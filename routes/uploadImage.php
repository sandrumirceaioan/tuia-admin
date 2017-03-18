<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

if ( !empty( $_FILES ) ) {

    /* upload files and copy to small folder */
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = '../images/products/' . $_FILES[ 'file' ][ 'name' ];
    $uploadPathSmall = '../images/products/small/' . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file($tempPath, $uploadPath);
    copy($uploadPath, $uploadPathSmall);

    /* get image type */
    $imageInfo = mime_content_type($uploadPath);

        /* resize uploaded file in small folder*/
        if ($imageInfo == 'image/jpeg') {$src = imagecreatefromjpeg($uploadPathSmall);}
        if ($imageInfo == 'image/png') {$src = imagecreatefrompng($uploadPathSmall);}
        list($width, $height) = getimagesize($uploadPathSmall);
        $newWidth = 270;
        $newheight = 360; /*($height / $width) * $newWidth;*/
        $tmp = imagecreatetruecolor($newWidth, $newheight);
        imagecopyresampled($tmp, $src, 0,0,0,0, $newWidth, $newheight, $width, $height);

        if ($imageInfo == 'image/jpeg') {imagejpeg($tmp, $uploadPathSmall);}
        if ($imageInfo == 'image/png') {imagepng($tmp, $uploadPathSmall);}

        imagedestroy($src);
        imagedestroy($tmp);

    /* send success response to user */
    http_response_code(200);
    echo json_encode('{"success": "Image uploaded successfully!"}');
    die();

} else {

    http_response_code(500);
    echo json_encode('{"error": "Image missing!"}');
    die();

}
?>
