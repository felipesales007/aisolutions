import preview from './routes/preview';
import production from './routes/production';

const instance = import.meta.env.VITE_APP_MODO === 'preview' ? preview : production;

export default instance;
