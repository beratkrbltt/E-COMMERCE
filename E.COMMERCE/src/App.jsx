import { useEffect } from 'react';
import './App.css';
import PageContainer from './container/PageContainer';
import Header from './components/Header';
import RouterConfig from './confing/RouterConfig';
import Loading from './components/Loading';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateBasket, setDrawer, removeFromBasket } from './redux/slices/basketSlice';

function App() {
  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [dispatch, products]);

  const handleRemoveFromBasket = (productId) => {
    dispatch(removeFromBasket(productId));
    dispatch(calculateBasket());
  };

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer
          className="drawer" sx={{ padding: '20px' }} onClose={() => dispatch(setDrawer())} anchor="right" open={drawer}>
          {products.length > 0 ? (products.map((product) => (
            <div key={product.id}>
              <div className="flex-row" style={{ padding: '20px' }}>
                <img
                  style={{ marginRight: '5px' }} src={product.image} width={50} height={50} alt={product.title} />
                <p style={{ width: '320px', marginRight: '5px' }}>{product.title}({product.count})</p>
                <p style={{ fontWeight: 'bold', marginRight: '10px', width: '60px' }}>{product.price}TL</p>
                <button onClick={() => handleRemoveFromBasket(product.id)}
                  style={{
                    padding: '5px',
                    borderRadius: '5px',
                    backgroundColor: 'rgb(185, 76, 76)',
                    border: 'none',
                    color: '#fff',
                    width: '50px',
                  }}
                >sil</button>
              </div>
            </div>
          ))) : (
            <div
              style={{
                textAlign: 'center',
                padding: '20px',
                border: '2px dashed #ddd',
                borderRadius: '10px',
                marginTop: '20px',
                fontStyle: 'italic',
                color: '#888',
              }}>
              <p style={{ width: '250px' }}>Sepetiniz boş!</p>
            </div>
          )}
          <div>
            <p style={{ textAlign: 'center' }}>Toplam Tutar : {totalAmount}</p>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;
