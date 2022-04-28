import React, {useContext} from 'react';
import Modal from 'react-modal';
import {UserContext} from '../../Context/UserProvider';

Modal.setAppElement('#root');

const DeleteAccountModal = () => {
	//context
	const {openDeleteAccountModal, setOpenDeleteAccountModal, deleteAccount} = useContext(UserContext);

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
