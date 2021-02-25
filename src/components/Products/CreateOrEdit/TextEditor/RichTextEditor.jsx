import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './RichTextEditor.scss';

export default class RichTextEditor extends Component {
	constructor(props) {
		super(props);
		const html = props.value || '';
		const contentBlock = htmlToDraft(html);
		if (contentBlock) {
			const contentState = ContentState.createFromBlockArray(
				contentBlock.contentBlocks
			);
			const editorState = EditorState.createWithContent(contentState);
			this.state = {
				editorState,
			};
		}
	}

	triggerChange = changedValue => {
		const { onChange } = this.props;
		if (onChange) {
			onChange(changedValue);
		}
	};

	onEditorStateChange = editorState => {
		this.triggerChange(
			draftToHtml(convertToRaw(editorState.getCurrentContent()))
		);
		this.setState({
			editorState,
		});
	};

	render() {
		const { editorState } = this.state;
		return (
			<Editor
				editorState={editorState}
				wrapperClassName='editor'
				editorClassName='btm-editor'
				toolbarClassName='top-toolbar'
				onEditorStateChange={this.onEditorStateChange}
			/>
		);
	}
}
