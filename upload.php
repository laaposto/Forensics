<?php
$target_dir    = "uploads/";
$target_file   = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk      = 1;
$imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
$imagename     = pathinfo($target_file, PATHINFO_FILENAME);

$check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
if ($check !== false) {
} else {
    echo "error1";
    exit();
}
$i = 0;
if (file_exists($target_file)) {    
    do {
        $target_file = $target_dir . $imagename . ($i ? "_($i)" : "") . "." . $imageFileType;
        $i++;
    } while (file_exists($target_file));
}
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
    echo "error3";
    exit();
}

if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo basename($target_file);
} else {
    echo "error4";
}
?>