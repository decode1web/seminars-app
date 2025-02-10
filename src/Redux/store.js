import { configureStore } from '@reduxjs/toolkit'
import seminarsReducer from './slices/seminarsSlice'

const store = configureStore({
    reducer: {
        seminars: seminarsReducer,
    },
})

export default store