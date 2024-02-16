<?php
/**
 * Plugin Name:       Cards Block
 * Description:       A WordPress block to add collection of simple cards to your site.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Rich Tabor
 * Author URI:        https://rich.blog/blocks
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cards-block
 *
 * @package           tabor/cards-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function tabor_cards_block_init() {

	register_block_type( __DIR__ . '/build' );
	register_block_type( __DIR__ . '/build/card' );

}
add_action( 'init', 'tabor_cards_block_init' );
