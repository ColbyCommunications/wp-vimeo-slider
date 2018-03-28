<?php
/**
 * VimeoSorter.php
 *
 * @package colbycomms/wp-vimeo-slider
 */

namespace ColbyComms\VimeoSlider;

use Carbon_Fields\{Field, Container};
use Carbon_Fields\Helper\Helper;

/**
 * Creates an admin page for selecting and ordering Vimeo posts.
 */
class VimeoSorter {
	const COMPLEX_FIELD_KEY = VimeoSlider::FILTER_NAMESPACE . 'vimeo_posts_sorter';
	const SINGLE_POST_KEY = VimeoSlider::FILTER_NAMESPACE . 'sorter_vimeo_post';

	/**
	 * Adds hook callbacks.
	 */
	public function __construct() {
		add_action( 'carbon_fields_register_fields', [ $this, 'create_container' ] );
		add_action( 'carbon_fields_register_fields', [ $this, 'add_plugin_options' ] );
	}
	/**
	 * Creates the options page.
	 */
	public function create_container() {
		$this->container = Container::make( 'theme_options', 'Vimeo Sorter' )
			->set_page_parent( 'edit.php?post_type=' . VimeoPost::POST_TYPE_NAME );
	}

	/**
	 * Get the posts for the user to choose from.
	 *
	 * @return array The posts. 
	 */
	public static function get_posts() : array {
		$query = new \WP_Query( [
			'post_type' => VimeoPost::POST_TYPE_NAME,
			'posts_per_page' => 99,
		] );

		return is_array( $query->posts ) ? $query->posts : [];
	}

	/**
	 * Adds a post's ID and title to the array generating the select options.
	 *
	 * @param array $options The array corresponding to the select options.
	 * @param \WP_Post $post A WP_Post option.
	 * @return array The modified array.
	 */
	public static function add_post_to_select_options( array $options = [], \WP_Post $post ) : array {
		$options[ $post->ID ] = $post->post_title;
		return $options;
	}

	/**
	 * Get select options to pass to the select Field.
	 *
	 * @return array
	 */
	public static function get_select_options() : array {
		static $options;

		if ( empty( $options ) ) {
			$options = array_reduce(
				self::get_posts(),
				[ __CLASS__, 'add_post_to_select_options' ],
				[]
			);
		}

		return $options;
	}

	/**
	 * Sets and returns an array of Carbon Fields theme options fields.
	 *
	 * @return array The fields.
	 */
	public static function get_fields() : array {
		return [
			Field::make( 'complex', self::COMPLEX_FIELD_KEY, 'Vimeo Posts' )
				->add_fields(
					[
						Field::make(
							'select',
							self::SINGLE_POST_KEY,
							'Vimeo Post'
						)
							->add_options( self::get_select_options() )
					]
				)
				->set_help_text( 'Add up to 5 Vimeo posts. Drag and drop to reorder them.' ),
		];
	}

	/**
	 * Adds the plugin options.
	 */
	public function add_plugin_options() {
		$this->container->add_fields( self::get_fields() );
	}

	/**
	 * Get a theme option.
	 *
	 * @param string $key The option key.
	 * @return mixed The value.
	 */
	public static function get( string $key ) {
		static $cache;
		$cache = $cache ?: [];
		
		if ( isset( $cache[ $key ] ) ) {
			return $cache[ $key ];
		}
		
		$value = Helper::get_theme_option( $key ) ?: '';
		
		$cache[ $key ] = $value;
		
		return $value;
	}

	public static function get_attribute() : string {
		return implode(',', array_map(
			function( $item ) {
				return (string) $item[ self::SINGLE_POST_KEY ];
			},
			self::get( self::COMPLEX_FIELD_KEY ) ?: []
		) );
	}
}
