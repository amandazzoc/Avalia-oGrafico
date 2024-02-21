<?php 

include_once('conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);


$query = $pdo->prepare("SELECT * FROM vendas");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);



for ($i=0; $i < count($res); $i++) { 
      $dados[] = array(
        'qntvendas' => $res[$i]['qntvendas'],
        'qntestoque' => $res[$i]['qntestoque'],        
     
    );

}


if(count($res) > 0){
    $result = json_encode(array('success'=>true, 'resultado'=>@$dados));
}else{
    $result = json_encode(array('success'=>false, 'resultado'=>'0'));
}

echo $result;

?>                                                                             