/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	DropZone,
	TextControl,
	PanelBody,
	MenuItem,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	mediaUpload,
} from '@wordpress/editor';
import {
	RichText,
	BlockControls,
	useBlockProps,
	InspectorControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import {
	useRef,useEffect,
} from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

function CardEdit( { attributes, setAttributes } ) {

	const {
		description,
		title,
		image,
		link,
		isOverflowTitle,
		isOverflowDescription,
	} = attributes;

	// const titleRef = useRef( null );
	// const descriptionRef = useRef( null );

	// useEffect(() => {
	// 	// Function to check if the content of an element is multiline
	// 	const checkForMultiLine = ( element ) => {
	// 	  if (element) {
	// 		const lineHeight = parseFloat(getComputedStyle( element ).lineHeight);
	// 		const height = element.offsetHeight;
	// 		return height > lineHeight;
	// 	  }
	// 	  return false;
	// 	};

	// 	// Set attribute based on title's multiline status.
	// 	const isTitleMultiline = checkForMultiLine( titleRef.current );
	// 	setAttributes( { isOverflowTitle: isTitleMultiline } );

	// 	// Set attribute based on description's multiline status.
	// 	const isDescriptionMultiline = checkForMultiLine( descriptionRef.current );
	// 	setAttributes( { isOverflowDescription: isDescriptionMultiline } );

	// 	// console.log('desc' + isDescriptionMultiline);
	// 	// console.log('title' + isTitleMultiline);

	// }, [ title, description ]);

	function onChange( attribute ) {
		return ( newValue ) => {
			setAttributes( { [ attribute ]: newValue } );
		};
	}

	function onSelectImage( media ) {
		if ( ! media || ! media.url ) {
			// In this case there was an error
			// previous attributes should be removed
			// because they may be temporary blob urls.
			setAttributes( {
				image: undefined
			} );
			return;
		}

		// Sets the block's attribute and updates the edit component from the selected media.
		setAttributes( {
			image: media.url,
		} );
	}

	const blockProps = useBlockProps( { className: 'remove-outline' } );

	const onDropImage = ( files ) => {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => {
				setAttributes( { image: media.url } );
			},
		} );
	};

	const onRemoveImage = () => {
		setAttributes( { image: undefined } );
	};

	const dropZone = (
		<DropZone
			label={ __( 'Drop image', 'tabor' ) }
			onFilesDrop={ onDropImage }
		/>
	);

	const inspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Link' ) }>
				<TextControl
					value={ link }
					onChange={ onChange( 'link' ) }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Overflow title' ) }
					checked={ isOverflowTitle }
					onChange={ () =>
						setAttributes( { isOverflowTitle: ! isOverflowTitle } )
					}
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Overflow description' ) }
					checked={ isOverflowDescription }
					onChange={ () =>
						setAttributes( { isOverflowDescription: ! isOverflowDescription } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);

	const blockControls = (
		<BlockControls group="other">
			<MediaReplaceFlow
				mediaURL={ image }
				allowedTypes={ [ 'image' ] }
				accept="image/*"
				onSelect={ onSelectImage }
				name={ ! image ? __( 'Add Image' ) : __( 'Replace' ) }
			>
				<MenuItem onClick={ onRemoveImage }>{ __( 'Reset' ) }</MenuItem>
			</MediaReplaceFlow>
		</BlockControls>
	)

	return (
		<>
			{ blockControls }
			{ inspectorControls }
			<div { ...blockProps }>
				{ dropZone }
				{ image && (
					<span class="wp-block-tabor-card__image">
						<img
						alt={ title }
						src={ image }
					/>
					</span>
				) }
				<span
					className={ classnames( 'wp-block-tabor-card__content', {
						'has-image': image
					} ) }
				>
					<RichText
						// ref={ titleRef }
						identifier="title"
						tagName="span"
						className="wp-block-tabor-card__title"
						value={ title }
						multiline={ false }
						onChange={ onChange( 'title' ) }
						aria-label={
							title
								? __(
										'Card title',
										'tabor'
								)
								: __(
										'Empty title',
										'tabor'
								)
						}
						data-empty={ title ? false : true }
						placeholder={ __(
							'Card title',
							'tabor'
						) }
						allowedFormats={ [] }
					/>
					<RichText
						// ref={ descriptionRef }
						identifier="description"
						tagName="span"
						className="wp-block-tabor-card__description"
						value={ description }
						multiline={ false }
						onChange={ onChange( 'description' ) }
						aria-label={
							title
								? __(
										'Card description',
										'sellhero'
								)
								: __(
										'Empty description',
										'tabor'
								)
						}
						data-empty={ description ? false : true }
						placeholder={ __(
							'Card description',
							'tabor'
						) }
						allowedFormats={ [] }
					/>
				</span>
			</div>
		</>
	);
}

export default CardEdit;
