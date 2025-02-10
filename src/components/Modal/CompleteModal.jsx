import { Box, Button, Modal, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { deleteSeminar, openCompleteModal } from "../../Redux/slices/seminarsSlice"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    borderRadius: '10px'
};

export const CompleteModal = ({id}) => {
    const dispatch = useDispatch()
    const open = useSelector(state => state.seminars.isOpenCompleteModal)
    return (
        <Modal
            open={open}
            onClose={() => dispatch(openCompleteModal())}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
                <Typography id='modal-modal-description' sx={{mt: 2, fontSize: 20}}>
                    Подверждаете ли вы <span style={{color: '#fd5361', fontWeight: 600}}>УДАЛИТЬ</span> семинара?
                </Typography>
                <Button onClick={() => {
                        dispatch(deleteSeminar(id))
                        dispatch(openCompleteModal())
                    }} variant="contained" sx={{ mt: 5, background: '#fd5361', fontWeight: 600 }}>Удалить</Button>
            </Box>
        </Modal>
    )
}