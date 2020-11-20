import React from 'react';
import PropTypes from "prop-types";

const FormDialogJsonTemplate = ({ open, handleClose, id }) => {

    console.log(open,handleClose,id);
    return (
        <div>
			fuck
        </div>
    );
};


FormDialogJsonTemplate.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
};


export default FormDialogJsonTemplate;