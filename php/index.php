<?php
    // error_reporting(0);
    if(isset($_POST['url'])){
        // $ig = "https://instagram.com";
        // $html = file_get_contents($ig.$_POST['url']);
        // $doc = new DOMDocument();
        // @$doc->loadHTML($html);
        // $metas = $doc->getElementsByTagName('meta');
        // for($i = 0; $i < $metas->length; $i++){
        //     $meta = $metas->item($i);
        //     if($meta->getAttribute('property') == 'og:image'){
        //         $img = $meta->getAttribute('content');
        //         header('Content-Type: application/json');
        //         $response['status'] = 1;
        //         $response['url'] = $img;
        //         echo json_encode($response);
        //     }
        // }
        $a['a']=1;
        $a['b']=2;
        echo json_encode($a);
    }
?>