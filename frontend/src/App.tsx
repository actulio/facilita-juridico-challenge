import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import RoutesWithAnimation from './routes';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <RoutesWithAnimation />
    </BrowserRouter>
  );
}

export default App;
