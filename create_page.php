<?php
$newcontent = file_get_contents("template.html");
$img        = $_GET['img'];
$newcontent = str_replace('var url_to_verify="";', 'var url_to_verify="'.$img.'";', $newcontent);
$newcontent = str_replace('content=""', 'content="'.$img.'";', $newcontent);
$unique     = hash('ripemd160', $img);
$dirname    = 'results/' . $unique;
if (!is_dir($dirname)) {
    mkdir($dirname, 0777, true);
}
if (!file_exists('./results/' . $unique . '/index.html')) {
    $handle = fopen('./results/' . $unique . '/index.html', 'w+');
    fwrite($handle, $newcontent);
    fclose($handle);
}
echo $dirname;
?>