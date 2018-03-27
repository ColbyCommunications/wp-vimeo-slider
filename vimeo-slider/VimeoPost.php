<?php
/**
 * VimeoPost.php
 *
 * @package colbycomms/wp-vimeo-slider
 */

namespace ColbyComms\VimeoSlider;

use Vimeo\Vimeo;

/**
 * Handles the vimeo-video post type.
 */
class VimeoPost {
	const VIMEO_ENDPOINT = '/videos/%s';
	const POST_TYPE_NAME = 'vimeo-video';
	const VIMEO_DATA_META_KEY = VimeoSlider::FILTER_NAMESPACE . self::POST_TYPE_NAME . '_vimeo_data';

	/**
	 * Adds hook callbacks.
	 */
	public function __construct() {
		add_action( 'init', [ __CLASS__, 'register_the_post_type' ] );
		add_action( 'save_post_' . self::POST_TYPE_NAME, [ __CLASS__, 'save_post_vimeo_data' ] );
		add_action( 'rest_prepare_' . self::POST_TYPE_NAME, [ __CLASS__, 'add_vimeo_data_to_rest' ], 10, 2 );
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

	/**
	 * Fetches vimeo data from the Vimeo API.
	 *
	 * @param string $vimeo_id The numeric Vimeo ID.
	 * @return array The vimeo data.
	 */
	public static function fetch_vimeo_data( string $vimeo_id ) : array {
		$id = Options::get( Options::CLIENT_ID_KEY );
		$secret = Options::get( Options::CLIENT_SECRET_KEY );
		$access_token = Options::get( Options::ACCESS_TOKEN_KEY );

		$vimeo = new \Vimeo\Vimeo( $id, $secret );

		$vimeo->setToken( $access_token );

		$response = $vimeo->request(
			sprintf( self::VIMEO_ENDPOINT, $vimeo_id )
		);

		return is_array( $response['body'] ) ? $response['body'] : [];
	}

	/**
	 * Callback for the save_post hook. Saves vimeo data to database.
	 *
	 * The Vimeo API has rate limiting, so we store requested data for 24 hours.
	 *
	 * @param string|int $post_id The current post ID.
	 * @return void
	 */
	public static function save_post_vimeo_data( $post_id = '' ) {
		$vimeo_id = VimeoPostMeta::get( VimeoPostMeta::VIMEO_ID_KEY, $post_id );

		if ( empty( $vimeo_id ) ) {
			return;
		}

		$vimeo_data = get_transient( VimeoSlider::FILTER_NAMESPACE . "vimeo_$vimeo_id" );

		if ( true || empty( $vimeo_data ) ) {
			$vimeo_data = self::fetch_vimeo_data( $vimeo_id );
			set_transient(
				VimeoSlider::FILTER_NAMESPACE . "vimeo_$vimeo_id",
				$vimeo_data,
				24 * 60 * 60
			);
		}

		update_post_meta(
			$post_id,
			self::VIMEO_DATA_META_KEY,
			$vimeo_data
		);
	}

	/**
	 * Includes the Vimeo data in the rest response.
	 *
	 * @param \WP_REST_Response $response The unmodified response.
	 * @param \WP_Post $post The current post.
	 * @return \WP_REST_Response The modified response.
	 */
	public static function add_vimeo_data_to_rest( \WP_REST_Response $response, \WP_Post $post ) : \WP_REST_Response {
		$response->data['vimeo_data'] = get_post_meta(
			$post->ID,
			self::VIMEO_DATA_META_KEY,
			true
		);

		return $response;
	}
}
