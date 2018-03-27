<?php
/**
 * VimeoPost.php
 *
 * @package colbycomms/wp-vimeo-slider
 */

namespace ColbyComms\VimeoSlider;

/**
 * Handles the vimeo-video post type.
 */
class VimeoPost {
	const POST_TYPE_NAME = 'vimeo-video';

	/**
	 * Adds hook callbacks.
	 */
	public function __construct() {
		add_action( 'init', [ __CLASS__, 'register_the_post_type' ] );
	}

	/**
	 * Creates the post type.
	 *
	 * @return void
	 */
	public static function register_the_post_type() {
		register_post_type(
			self::POST_TYPE_NAME,
			[
				'label' => 'Vimeo Videos',
				'labels' => [
					'singular_name' => 'Vimeo Video',
				],
				'public' => true,
				'exclude_from_search' => true,
				'publicly_queryable' => true,
				'supports' => [ 'title' ],
				'show_in_rest' => true,
			]
		);
	}
}
