<?php 

$donnes = json_decode(file_get_contents("php://input"));
$donnes = (array)$donnes;
$i= 0;
$data = [];
while($i<2){
    switch($i){
        case 0:$data["username"] = $donnes['username'];
        break;
        case 1: $data["password"] = $donnes['password'];
        break;  
    }
    $i++;
}

print json_encode($data);

?>