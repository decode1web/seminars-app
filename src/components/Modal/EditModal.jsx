import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { fetchSeminarId, openEditModal, updateSeminar } from "../../Redux/slices/seminarsSlice"
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

export const EditModal = ({id}) => {
    const { seminarDetails } = useSelector(state => state.seminars)
    const open = useSelector(state => state.seminars.isOpenEditModal)
    const dispatch = useDispatch()

    // Локальное состояние для формы
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        photo: ''
    })

    // Загружаем данные семинара при открытии модального окна
    useEffect(() => {
        if(id){
            dispatch(fetchSeminarId(id))
        }
    },[dispatch, id])

    // Обновляем локальное состояние при загрузке данных семинара
    useEffect(() => {
        if(seminarDetails) {
            setFormData({
                title: seminarDetails.title || '',
                description: seminarDetails.description || '',
                date: seminarDetails.date || '',
                time: seminarDetails.time || '',
                photo: seminarDetails.photo || ''
            })
        }
    },[seminarDetails])

    // Обработчик изменения полей
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    // Обработчик сохранения
    const handleSave = () => {
        dispatch(updateSeminar({id, data: formData}))
        dispatch(openEditModal()) // Закрываем модалку
    }

    // Проверяем загружены ли данные
    if(!seminarDetails) {
        return null
    }
    return (
        <Modal
            open={open}
            onClose={() => dispatch(openEditModal())}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            className="edit-modal-st"
        >
            <Box sx={style}>
                <div className='edit-container'>
                    <div className="flex-input_info">
                        <div>
                            <TextField slotProps={{inputLabel: {shrink: true,},}} id="outlined-basic" label="Название" variant="outlined" name='title' value={formData.title} onChange={handleChange} />
                        </div>
                        <div>
                            <TextField slotProps={{inputLabel: {shrink: true,},}} id="outlined-basic" label="Описание" variant="outlined" name='description' value={formData.description} onChange={handleChange} />
                        </div>
                        <div>
                            <TextField slotProps={{inputLabel: {shrink: true,},}} id="outlined-basic" label="Дата" variant="outlined" name='date' value={formData.date} onChange={handleChange} />
                        </div>
                        <div>
                            <TextField slotProps={{inputLabel: {shrink: true,},}} id="outlined-basic" label="Время" variant="outlined" name='time' value={formData.time} onChange={handleChange}/>
                        </div>
                        <div>
                            <TextField slotProps={{inputLabel: {shrink: true,},}} id="outlined-basic" label="URL Фото" variant="outlined" name='photo' value={formData.photo} onChange={handleChange}/>
                        </div>
                        <div>
                            <Button onClick={handleSave} variant="contained">Сохранить</Button>
                        </div>
                    </div>
                    <div className="seminar-edit-photo"><img src={seminarDetails.photo || ''}/></div>
                </div>
            </Box>
        </Modal>
    )
}