import { Box, Modal } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { fetchSeminarId, openInfoModal } from "../../Redux/slices/seminarsSlice"
import { useEffect, useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    borderRadius: '10px'
};

export const InfoModal = ({id}) => {
    const { seminarDetails } = useSelector(state => state.seminars)
    const open = useSelector(state => state.seminars.isOpenInfoModal)
    const dispatch = useDispatch()


    // Загружаем данные семинара при открытии модального окна
    useEffect(() => {
        if(id){
            dispatch(fetchSeminarId(id))
        }
    },[dispatch, id])


    // Проверяем загружены ли данные
    if(!seminarDetails) {
        return null
    }
    return (
        <Modal
            open={open}
            onClose={() => dispatch(openInfoModal())}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            className="edit-modal-st"
        >
            <Box sx={style}>
                <div className='edit-container'>
                    <div className="flex-input_info">
                        <div>
                            {seminarDetails.title}
                        </div>
                        <div>
                            {seminarDetails.description}
                        </div>
                        <div>
                            {seminarDetails.date}
                        </div>
                        <div>
                            {seminarDetails.time}
                        </div>
                    </div>
                    <div className="seminar-edit-photo"><img src={seminarDetails.photo || ''}/></div>
                </div>
            </Box>
        </Modal>
    )
}