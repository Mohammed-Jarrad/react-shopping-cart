import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { DeleteRequest } from '../../utils/requests';

Modal.setAppElement('#root');

const DeleteAccountModal = ({ openDeleteAccountModal, setOpenDeleteAccountModal }) => {
	const navigate = useNavigate();

	async function deleteAccount() {
		try {
			const res = await DeleteRequest(`/user`);
			const data = await res.json();
			if (res.status === 202) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				console.log(res);
				console.log(data);
				navigate('/login');
			} else {
				console.log(res.json());
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Modal
			isOpen={openDeleteAccountModal}
			onRequestClose={() => setOpenDeleteAccountModal(false)}
			className='modal delete-modal'
			overlayClassName='overlay-modal'
			closeTimeoutMS={250}
		>
			<div className='accept-delete'>
				<h3> Are You Sure to Delete your Account? </h3>
				<form
					onSubmit={e => {
						e.preventDefault();
						deleteAccount();
					}}
				>
					<button>yes</button>
					<button
						onClick={e => {
							e.preventDefault();
							setOpenDeleteAccountModal(false);
						}}
					>
						No
					</button>
				</form>
			</div>
		</Modal>
	);
};

export default DeleteAccountModal;
