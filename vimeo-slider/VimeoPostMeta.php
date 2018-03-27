<?php
/**
 * VimeoPostMeta.php
 *
 * @package colbycomms/wp-vimeo-slider
 */

namespace ColbyComms\VimeoSlider;

use Carbon_Fields\{Field, Container};
use Carbon_Fields\Helper\Helper as Carbon;

/**
 * Add hooks to register meta fields for events posts.
 */
class VimeoPostMeta {
	const VIMEO_ID_KEY = VimeoSlider::FILTER_NAMESPACE . 'vimeo_id';
	const VIMEO_DESCRIPTION_KEY = VimeoSlider::FILTER_NAMESPACE . 'vimeo_description';

	/**
	 * Constructor function; add all hooks.
	 */
	public function __construct() {
		add_action(
			'carbon_fields_register_fields',
			[ $this, 'register_post_meta_box' ]
		);

		add_action(
			'carbon_fields_register_fields',
			[ $this, 'register_fields' ]
		);
	}

	/**
	 * Creates the box that will contain meta fields.
	 */
	public function register_post_meta_box() {
		$this->details_box = Container::make( 'post_meta', 'Video Details' )
			->where( 'post_type', '=', VimeoPost::POST_TYPE_NAME );
	}

	/**
	 * Provides an array of fields to add.
	 *
	 * @return array The fields.
	 */
	public static function get_fields() {
		return [
			Field::make( 'text', self::VIMEO_ID_KEY, 'Vimeo ID' )
				->set_help_text( 'The Vimeo ID is the number in the video\'s Vimeo URL.' )
				->set_required( true )
				->set_visible_in_rest_api( true ),

			Field::make( 'text', self::VIMEO_DESCRIPTION_KEY, 'Description' )
				->set_help_text( 'Optional but recommended.' )
				->set_visible_in_rest_api( true ),
		];
	}

	/**
	 * Adds the location field to the details box.
	 */
	public function register_fields() {
		$this->details_box->add_fields( self::get_fields() );
	}

	/**
	 * Get a meta field.
	 *
	 * @param string $key A meta key.
	 * @param int|string $id Post ID.
	 * @return mixed The retrieved value or null.
	 */
	public static function get( string $key, $id = null ) {
		static $cache;

		$cache = $cache ?: [];
		$id = $id ?: get_the_id();

		if ( empty( $id ) ) {
			return null;
		}

		$cache_key = "$key$id";

		if ( isset( $cache[ $cache_key ] ) ) {
			return $cache[ $cache_key ];
		}

		$value = Carbon::get_post_meta( $id, $key );
		$cache[ $cache_key ] = $value;

		return $value;
	}
}
