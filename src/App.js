import { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList/ProductList';
import SalesList from './components/SalesList/SalesList';
import ClientList from './components/ClientList/ClientList';
function App() {
    const [tab, setTab] = useState('Productos');
    return (
        <div className="App">
            {tab === 'Productos' && <ProductList tab={tab} setTab={setTab} />}
            {tab === 'Clientes' && <ClientList tab={tab} setTab={setTab} />}
            {tab === 'Ventas' && <SalesList tab={tab} setTab={setTab} />}
        </div>
    );
}

export default App;
