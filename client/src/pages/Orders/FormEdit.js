import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const FormEdit = ({ showEditForm, setShowEditForm }) => {

    async function editOrder(e) {
        e.preventDefault();

    }

    return (
        <Modal
            isOpen={showEditForm}
            onRequestClose={() => setShowEditForm(false)}
        // className="order-edit-form"
        >
            <form onSubmit={editOrder}>
                <input type="text" placeholder="" />
                <input type="text" placeholder="" />
                <input type="text" placeholder="" />
                <input type="submit" value="Edit" />
            </form>
        </Modal>
    )
}

export default FormEdit