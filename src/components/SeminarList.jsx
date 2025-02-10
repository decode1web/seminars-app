import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchSeminars, openCompleteModal, openEditModal, openInfoModal } from '../Redux/slices/seminarsSlice'
import DeleteIcon from "@mui/icons-material/Delete"
import { CompleteModal } from './Modal/CompleteModal'
import { EditModal } from './Modal/EditModal'
import EditIcon from '@mui/icons-material/Edit'
import { InfoModal } from './Modal/InfoModal'

export const SeminarList = () => {
    const dispatch = useDispatch()
    const seminars = useSelector(state => state.seminars.seminars)
    const [selectedSeminarId, setSelectedSeminarId] = useState()
    
    useEffect(() => {
        dispatch(fetchSeminars())
    },[dispatch])
    
    return (
        <div className={seminars.length === 0 || seminars.length == 4 ? "seminar_list mt-0" : "seminar_list"}>
            {seminars.length === 0 ? (
                <p>Пока что семинаров нет.</p>
            ) : (
                <ul>
                    {seminars.map((item) => (
                        <li key={item.id} onClick={(e) => {
                            e.stopPropagation()
                            dispatch(openInfoModal())
                            setSelectedSeminarId(item)
                        }}>
                            {item.title}
                            <div>
                                <EditIcon onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch(openEditModal())
                                    setSelectedSeminarId(item.id)
                                }}/>
                                <DeleteIcon onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch(openCompleteModal())
                                    setSelectedSeminarId(item.id)
                                }}/>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <CompleteModal id={selectedSeminarId} />
            <EditModal id={selectedSeminarId}/>
            <InfoModal id={selectedSeminarId}/>
        </div>
    )
}