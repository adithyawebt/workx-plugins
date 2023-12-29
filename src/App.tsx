import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import './App.css'

import Calendar from './components/Calendar/Calendar'

function App() {

    return (
        <Provider store={store}>
            <Calendar />
        </Provider>
    )
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
