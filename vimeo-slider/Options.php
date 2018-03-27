<?php
/**
 * Creates the plugin admin page.
 *
 * @package colbycomms/whos-coming
 */

namespace ColbyComms\VimeoSlider;

use Carbon_Fields\Helper\Helper;
use Carbon_Fields\{Container, Field};

/**
 * Sets up an options page using Carbon Fields.
 */
class Options {
	const ACCESS_TOKEN_KEY = VimeoSlider::FILTER_NAMESPACE . 'vimeo_access_token';
	const CLIENT_ID_KEY = VimeoSlider::FILTER_NAMESPACE . 'vimeo_client_id';
	const CLIENT_SECRET_KEY = VimeoSlider::FILTER_NAMESPACE . 'vimeo_client_secret';

	/**
	 * Adds hooks.
	 */
	public function __construct() {
		add_action( 'carbon_fields_register_fields', [ $this, 'create_container' ] );
		add_action( 'carbon_fields_register_fields', [ $this, 'add_plugin_options' ] );
	}

	/**
	 * Creates the options page.
	 */
	public function create_container() {
		$this->container = Container::make( 'theme_options', 'Vimeo Settings' )
			->set_page_parent( 'plugins.php' );
	}

	/**
	 * Provides an array of fields to add to the container.
	 *
	 * @return array An array of fields.
	 */
	public static function get_fields() : array {
		return [
			Field::make( 'text', self::ACCESS_TOKEN_KEY, 'Vimeo Access Token' )
				->set_help_text( 'An access token for this site\'s Vimeo account.' ),

			Field::make( 'text', self::CLIENT_ID_KEY, 'Vimeo Client ID' )
				->set_help_text( 'A client ID for this site\'s Vimeo account.' ),

			Field::make( 'text', self::CLIENT_SECRET_KEY, 'Vimeo Client Secret' )
				->set_help_text( 'A client secret for this site\'s Vimeo account.' ),
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

		$value = Helper::get_theme_option( $key );
		$cache[ $key ] = $value;

		return $value;
	}
}
