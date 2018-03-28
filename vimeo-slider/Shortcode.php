<?php
/**
 * Block.php
 *
 * @package colbycomms/wp-vimeo-slider
 */

namespace ColbyComms\VimeoSlider;

/**
 * Handles the [vimeo-slider] shortcode.
 */
class Shortcode {
	const SHORTCODE_TAG = 'vimeo-slider';

	/**
	 * Hooks
	 */
	public function __construct() {
		add_action( 'init', [ __CLASS__, 'register_shortcode' ] );
	}

	/**
	 * Registers the shortcode callback.
	 */
	public static function register_shortcode() {
		add_shortcode( self::SHORTCODE_TAG, [ __CLASS__, 'render' ] );
	}

	/**
	 * Renders the block.
	 *
	 * @param array $options Shortcode $atts or a passed-in array.
	 * @return string The generated HTML.
	 */
	public static function render( $options = [] ) : string {
		ob_start();
		?>
<div
	data-vimeo-slider
	data-vimeo-posts-endpoint="<?php echo esc_url( get_rest_url( null, '/wp/v2/vimeo-video/' ) ); ?>"
	data-vimeo-posts="<?php echo esc_attr( VimeoSorter::get_attribute() ); ?>"
>
</div>

		<?php

		return ob_get_clean();
	}
}
