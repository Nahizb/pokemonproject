import ReactDOM from 'react-dom/client';  // Asegúrate de importar desde 'react-dom/client' en React 18
import { App } from './App';
import './sass/index.scss';



// Asegúrate de que el contenedor con id "root" existe en tu HTML
const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<App />);  // Usualmente se renderiza el componente principal como App
