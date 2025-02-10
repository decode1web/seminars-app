import { Provider } from 'react-redux'
import './App.css'
import { SeminarList } from './components/SeminarList'
import store from './Redux/store'

function App() {

  return (
    <Provider store={store}>
      <SeminarList />
    </Provider>
  )
}

export default App
