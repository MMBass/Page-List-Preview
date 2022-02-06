<?php

/**
 * @package Page List Preview
*/
/*
Plugin Name: Page List Preview
Plugin URI:  Plugin URI: https://github.com/MMBass/Page-List-Preview
Description: Image preview for every page in wp admin pages list, no need to click 'View' anymore
Author: Mendi Bass
Author URI: https://github.com/MMBass
Version: 2.0.0
License: GPL v2 or later
Text Domain: page-list-preview 
Domain Path: /languages
*/

if ( !defined( 'ABSPATH' ) ){
    die;
} 

function plp_filter_pages_columns( $columns ) {
    /** Add a 'Preview' Column **/
    $myCustomColumns = array(
        'Preview' => __( 'Preview')
    );
    $columns = array_merge( $columns, $myCustomColumns );
 
    return $columns;
}

function plp_add_script_to_admin_pages_list()
{
    // $pagenow, is a global variable referring to the filename of the current page
    global $pagenow;
 
    if ($pagenow != 'edit.php') {
        return;
    }
     
    // loading css
    wp_enqueue_style( 'plp_style', plugins_url( 'plp_style.css', __FILE__ ) );
	if(is_rtl()){
		wp_enqueue_style( 'plp_rtl_style', plugins_url( 'plp_rtl_style.css', __FILE__ ) );
	}
    wp_enqueue_script( 'plp_resize', plugins_url( 'plp-resize.js', __FILE__ ) );

}
 
add_action( 'admin_enqueue_scripts', 'plp_add_script_to_admin_pages_list' );

function create_plp_pages_column( $column, $post_id ) {
  if ( 'Preview' === $column) {

	$plp_page_link =  get_permalink( $post_id );

    echo '
	    <div class="plp-container">
			<iframe
			    class="plp-iframe plp-resizable-iframe"
				sandbox="allow-scripts allow-same-origin" 
				loading="lazy" 
				scrolling="no"   
				src="'.esc_url( $plp_page_link ).'">
			</iframe>
	    </div>
		';
  }
}

add_filter( 'manage_pages_columns', 'plp_filter_pages_columns' );

add_action( 'manage_pages_custom_column', 'create_plp_pages_column', 10, 2);
  

?>