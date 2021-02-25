import React, { Component } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { requestDeleteImage, uploadImageUrl } from 'Api/backend-api';
import { BASE_URL, UPLOAD_URL } from 'Config';

export default class ImageUploader extends Component {
	state = {
		previewVisible: false,
		previewImage: '',
		fileList: [],
		fileNames: [],
		loading: false,
	};

	fileNames = [];

	componentDidMount() {
		const fileNames = this.props.value;
		if (fileNames) {
			let uid = 0;
			const fileList = fileNames.map(fileName => ({
				uid: uid--,
				name: fileName,
				status: 'done',
				url: `${BASE_URL}${UPLOAD_URL}/${fileName}`,
			}));
			this.fileNames = fileNames;
			this.setState({ fileList });
		}
	}

	triggerChange = changedValue => {
		const { onChange } = this.props;
		if (onChange) {
			onChange(changedValue);
		}
	};

	addAFileName = newName => {
		this.fileNames.push(newName);
		this.triggerChange(this.fileNames);
	};

	deleteAFileName = oldName => {
		this.fileNames = this.fileNames.filter(fileName => fileName !== oldName);
		this.triggerChange(this.fileNames);
	};

	handleCancel = () => this.setState({ previewVisible: false });

	handlePreview = file => {
		this.setState({
			previewImage: file.url,
			previewVisible: true,
		});
	};

	handleChange = ({ file, fileList }) => {
		const { status, response } = file;
		switch (status) {
			case 'uploading':
				this.setState({ loading: true });
				break;
			case 'done':
				const { status, data } = response;
				if (status === 0) {
					fileList[fileList.length - 1].url = data.url;
					fileList[fileList.length - 1].name = data.name;
					this.addAFileName(data.name);
				} else {
					message.error('Image upload failed', 1);
					let thisFile = fileList[fileList.length - 1];
					fileList[fileList.length - 1] = {
						response: 'Image upload failed',
						uid: thisFile.uid,
						name: thisFile.name,
						status: 'error',
					};
				}
				break;
			case 'removed':
				this.deleteAFileName(file.name);
				if (file.uid < 0) {
					requestDeleteImage(file.name);
				}
				break;
			case 'error':
				fileList[fileList.length - 1].response = 'Server issus: 404';
				break;
			default:
				break;
		}
		this.setState({
			fileList: fileList.filter(file => file.status),
			loading: false,
		});
	};

	beforeUpload = file => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	};

	render() {
		const { previewVisible, previewImage, fileList } = this.state;
		const uploadButton = (
			<div>
				{this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		);
		return (
			<>
				<Upload
					action={uploadImageUrl}
					listType='picture-card'
					name='image'
					fileList={fileList}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
					beforeUpload={this.beforeUpload}
					accept='image/png, image/jpeg'
				>
					{fileList.length >= 4 ? null : uploadButton}
				</Upload>
				<Modal
					visible={previewVisible}
					onCancel={this.handleCancel}
					footer={null}
				>
					<img alt='example' style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</>
		);
	}
}
