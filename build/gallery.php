<?php
function buildgallery($url,$type) {
        
        $layout = file_get_contents('html/gallery.html');
        
            $query = mysql_query("SELECT * FROM main_table WHERE the_type = '".$type."' AND the_url = '".$url."'");
            $gallery = mysql_fetch_assoc($query);
            
            $iquery = mysql_query("SELECT * FROM tuia_galerie");
            
            $one_image='';
            
            while ($row = mysql_fetch_assoc($iquery)) {
                
                $one_image .= '
                <div class="col-md-6 col-sm-3 col-xs-6 brand isotope-item">
                <a href="/images/gallery/'.$row['nume_poza'].'" class="fancybox-media">
                <img class="img-bg slid" src="/images/gallery/'.$row['nume_poza'].'" alt="'.$row['alt_poza'].'">                               
                </a>
                </div>
                ';
            }
            
            
            
            $layout = str_replace('{{_GALLERY_IMAGES}}',$one_image,$layout);
            
            $layout = str_replace('{{_GALLERY_DESCRIPTION}}',$gallery['the_shortdescription'],$layout);
                


     
    return $layout;
}
?>