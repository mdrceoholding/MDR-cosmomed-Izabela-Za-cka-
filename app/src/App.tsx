import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Compliance } from './pages/Compliance';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/compliance" element={<Compliance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
