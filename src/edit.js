/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';

const DEFAULT_BLOCK = {
	name: 'tabor/card',
	attributesToCopy: [
		'backgroundColor',
		'border',
		'className',
		'fontFamily',
		'fontSize',
		'gradient',
		'style',
		'textColor',
		'width',
	],
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, className } ) {

	const { fontSize, layout, style } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( className, {
			'has-custom-font-size': fontSize || style?.typography?.fontSize,
		} ),
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		defaultBlock: DEFAULT_BLOCK,
		// This check should be handled by the `Inserter` internally to be consistent across all blocks that use it.
		directInsert: true,
		template: [
			[
				'tabor/card',
			],
			[
				'tabor/card',
			],
			[
				'tabor/card',
			],
			[
				'tabor/card',
			],
		],
		allowedBlocks: [ 'tabor/card' ],
		templateInsertUpdatesSelection: true,
		orientation: layout?.orientation ?? 'horizontal',
	} );

	return <div { ...innerBlocksProps } />;
}
