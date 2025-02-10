import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Получение данных с сервера
export const fetchSeminars = createAsyncThunk(
    'seminars/fetchSeminars',
    async (_, { rejectedWithValue }) => {
        try {
            const response = await fetch('http://localhost:5000/seminars', {
                method: 'GET',
            })
    
            if(!response.ok) {
                throw new Error('Что-то пошло не так')
            }
            const data = await response.json()
            return data
        } catch (e) {
            rejectedWithValue(e.message)
        }
    }
)

// Удаления семинара по ID
export const deleteSeminar = createAsyncThunk(
    'seminars/deleteSeminar',
    async (seminarId, { rejectedWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/seminars/${seminarId}`,{
                method: 'DELETE',
            })

            if(!response.ok) {
                throw new Error('Ошибка при удаление задачи')
            }
            return seminarId // Возвращаем id, чтобы удалить его из State
        } catch (e) {
            return rejectedWithValue(e.message)
        }
    }
)

// Получение семинара по ID
export const fetchSeminarId = createAsyncThunk(
    'seminar/fetchSeminarId',
    async (seminarId, { rejectedWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/seminars/${seminarId}`, {
                method: 'GET'
            })
            if(!response.ok) {
                throw new Error('Ошибка при получение семинара по ID')
            }

            const data = await response.json()
            return data
        } catch (e) {
            return rejectedWithValue(e.message)
        }
    }
)

// Обновление семинара
export const updateSeminar = createAsyncThunk(
    'seminar/updateSeminar',
    async ({id, data}, { rejectedWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/seminars/${id}`)
            if(!response.ok) {
                throw new Error('Ошибка при обновлении семинара')
            }

            const oldData =  await response.json()

            // Обновляем только изменённые данные, но сохраняем все поля
            const mergedData = { ...oldData, ...data };

            // Отправляем обновлённые данные на сервер
            const updateResponse = await fetch(`http://localhost:5000/seminars/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mergedData),
            })

            if (!updateResponse.ok) throw new Error('Ошибка при обновлении семинара');

            return mergedData; // Возвращаем обновлённый семинар
        } catch (e) {
            return rejectedWithValue(e.message)
        }
    }
)

const seminarsSlice = createSlice({
    name: 'seminars',
    initialState: {
        seminars: [],
        seminarDetails: null,
        loading: false,
        error: null,
        isOpenCompleteModal: false,
        isOpenEditModal: false,
        isOpenInfoModal: false
    },
    reducers: {
        openCompleteModal: (state) => {
            state.isOpenCompleteModal = !state.isOpenCompleteModal
        },
        openEditModal: (state) => {
            state.isOpenEditModal = !state.isOpenEditModal
        },
        openInfoModal: (state) => {
            state.isOpenInfoModal = !state.isOpenInfoModal
        }
    },
    extraReducers: (builder) => {
        builder
            //  Обработка получение семинара
            .addCase(fetchSeminars.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSeminars.fulfilled, (state, action) => {
                state.loading = false
                state.seminars = action.payload
            })
            .addCase(fetchSeminars.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Обработка удаление семинара
            .addCase(deleteSeminar.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteSeminar.fulfilled, (state, action) => {
                state.loading = false
                state.seminars = state.seminars.filter((seminar) => seminar.id !== action.payload)
            })
            .addCase(deleteSeminar.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Обработка получение семинара по ID
            .addCase(fetchSeminarId.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSeminarId.fulfilled, (state, action) => {
                state.loading = false
                state.seminarDetails = action.payload
            })
            .addCase(fetchSeminarId.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Обработка изменение семинара
            .addCase(updateSeminar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSeminar.fulfilled, (state, action) => {
                state.loading = false
                state.seminars = state.seminars.map(seminar => seminar.id === action.payload.id ? action.payload : seminar)
                state.seminarDetails = action.payload
            })
            .addCase(updateSeminar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default seminarsSlice.reducer
export const { openCompleteModal, openEditModal, openInfoModal } = seminarsSlice.actions