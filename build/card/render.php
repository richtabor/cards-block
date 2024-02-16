<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$link                    = isset( $attributes['link'] ) ? $attributes['link'] : null;
$title                   = isset( $attributes['title'] ) ? $attributes['title'] : null;
$description             = isset( $attributes['description'] ) ? $attributes['description'] : null;
$is_overflow_title       = $attributes['isOverflowTitle'] ? 'is-overflow' : null;
$is_overflow_description = $attributes['isOverflowDescription'] ? 'is-overflow' : null;
$image_url               = $attributes['image'] ?? null;
$has_image               = isset( $attributes['image'] ) ? 'has-image' : null;
?>

<?php if ( $title && $title ) { ?>
	<a href="<?php echo esc_url( $link ); ?>" <?php echo get_block_wrapper_attributes(); ?>>
		<?php if ( $image_url ) { ?>
			<span class="wp-block-tabor-card__image">
				<img src="<?php echo esc_url( $image_url ); ?>" />
				<img src="<?php echo esc_url( $image_url ); ?>" class="wp-block-tabor-card__image-blur" />
			</span>
		<?php } ?>
		<span class="wp-block-tabor-card__content <?php echo esc_attr( $has_image ); ?>">
			<span class="wp-block-tabor-card__title <?php echo esc_attr( $is_overflow_title ); ?>"><?php echo esc_html( $title ); ?></span>
			<?php if ( $description ) { ?>
				<span class="wp-block-tabor-card__description <?php echo esc_attr( $is_overflow_description ); ?>"><?php echo esc_html( $description ); ?></span>
			<?php } ?>
		</span>
	</a>
<?php } ?>
