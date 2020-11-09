import React, { useState ,useMemo} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

// import { useDispatch } from "react-redux";
// import API_URL from "../../constants";
// import { alertError, alertSuccess } from "../../redux/actions";


const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #2196f3;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;


const FormDialogUpdateQuiz = ({ open, handleClose }) => {
    // add button should call backend api, stub for now

    const [name, setName] = useState("");

    
    const handleAdd = () => {
        console.log("ok");
        
    };

    
    
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
    } = useDropzone({
        accept: "image/jpeg, image/png",
        noDrag: true,
    });

    // const acceptedFileItems = 
    
    const memoizedValue = useMemo( ()=>{
        if(acceptedFiles[0]){
            const imageLocal = acceptedFiles[0];
            // setImage(imageLocal);
            return(<li key={imageLocal.path}>
                {imageLocal.path} - {imageLocal.size} bytes
		  </li>);
        }
        return "No image has been uploaded yet";
    }

    ,[acceptedFiles]);

    
    

        
        
        
        
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="form-dialog-title">Edit Quizze</DialogTitle>
            <DialogContent>
                <DialogContentText>
         Change the title of the created quizze
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Quizze Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <div style={{height:"30px"}} />
                <DialogContentText>
         Change the thumbnail of created quizze
                </DialogContentText>
                <div style={{height:"20px"}} />
                <section className="container">
                    <Container {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <Typography variant="body2" gutterBottom>
                Click to select an image
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            <em>(Only *.jpeg and *.png images will be accepted)</em>
                        </Typography>
                    </Container>
                    <aside>
                        <h4>Accepted files</h4>
                        <ul>{memoizedValue}</ul>
               
                    </aside>
                </section>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
          Cancel
                </Button>
                <Button onClick={handleAdd} color="primary">
          Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

FormDialogUpdateQuiz.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default FormDialogUpdateQuiz;
