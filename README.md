# wp-vimeo-slider

A horizontal slider playing Vimeo videos from a designated Vimeo account, with videos specified through the WordPress admin.

## Install

### WordPress

#### As a plugin

Clone this repository to your `wp-content/plugins` directory and activate it through the WordPress admin. The shortcode (see below) will then be available.

#### As a Composer package

Install this package into a WordPress theme/plugin via composer:

```
composer require colbycomms/wp-vimeo-slider
```

If you want to use the React component as an ES6 module from the `/vendor` directory, prevent this package's compiled script from loading with the provided `colbycomms__vimeo_slider__enqueue_script` filter, providing a callback that returns false--e.g.:

```PHP
add_filter( 'colbycomms__vimeo_slider__enqueue_script', function() {
    return false;
} );
```

### NPM

If you don't need the WordPress shortcode and plan to use this package as an ES6 module, install it using NPM or Yarn:

```
npm install wp-vimeo-slider

// OR

yarn add wp-vimeo-slider
```

This makes the main `VimeoSlider` React component available for use in your Javascript. See below for details.

## Usage

### WordPress

Activating the plugin will add the `Vimeo Videos` post type to the WordPress admin. For the shortcode to work, you need at least one post. A `Vimeo Sorter` page is also available (see under the `Vimeo Videos` menu item in the WP admin) for convenient selection and sorting of up to five videos. If the sorter is not used, the shortcode will display the five most recent Vimeo posts.

#### Shortcode

The shortcode takes no attributes:

```HTML
[vimeo-slider]
```

### React Component

To use this package as a React component, import it into your project -- e.g.:

```JS
import React from 'react';
import VimeoSlider from 'wp-vimeo-slider';

export const MyComponent = () => {
  return (
    <div>
      <VimeoSlider vimeoPostsEndpoint="//my-site.com/wp-json/wp/v2/vimeo-video/" />
    </div>
  )
}
```

#### Props

No props are required, but either `vimeoPostsEndpoint` or `vimeoPosts` must be passed for the component to work.

##### `vimeoPostsEndpoint`: PropTypes.string

A WP REST endpoint to query Vimeo posts from. This will probably be `//yoursite.com/wp-json/wp/v2/vimeo-video`, but it must be passed explicitly.

##### `totalPosts`: PropTypes.number (default: `5`)

The number of posts to show.

##### `includedPosts`: PropTypes.string

A comma-separated list of post IDs to include. If this is empty, the most recent posts will be used.

##### `vimeoPosts`: PropTypes.arrayOf(PropTypes.object)

You can pass an array of WP Post objects (in WP REST API format). This will cause the `totalPosts`, `vimeoPostsEndpoint`, and `includedPosts` props to be ignored.

##### `sliderSettings`: PropTypes.objectOf(PropTypes.any)

Options to pass to the underlying [react-slick](https://github.com/akiran/react-slick). This library provides defaults; overrides may negatively alter this component's behavior.
