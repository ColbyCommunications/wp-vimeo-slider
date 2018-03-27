<?php
/**
 * Main plugin entry point.
 *
 * @package colbycomms/wp-vimeo-slider
 */

namespace ColbyComms\VimeoSlider;

use Carbon_Fields\Carbon_Fields;

if ( ! defined( 'ABSPATH' ) ) {
	return;
}

new VimeoPost();
new VimeoPostMeta();
new VimeoSlider();
new Options();
new Shortcode();

add_action( 'after_setup_theme', [ Carbon_Fields::class, 'boot' ] );
