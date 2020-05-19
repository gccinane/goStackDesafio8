import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';
import {
  Container,
  Product,
  ProductList,
  ProductImage,
  ProductDescription,
  ProductPrice,
  ProductButton,
  ButtonText,
  ProductAmount,
  ProductAmountText,
} from './styles';

export default function Main({ navigation }) {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;
      return amount;
    }, {})
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadProducts() {
      const res = await api.get('/products');
      const data = res.data.map(product => ({
        ...product,
      }));
      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      <Header navigation={navigation} />
      <ProductList
        data={products}
        horizontal={true}
        keyExtractor={product => product.id.toString()}
        renderItem={({ item }) => (
          <Product>
            <ProductImage source={{ uri: item.image }} />
            <ProductDescription>{item.title}</ProductDescription>
            <ProductPrice>R${item.price}</ProductPrice>
            <ProductButton onPress={() => handleAddProduct(item.id)}>
              <ProductAmount>
                <Icon
                  name="cart-plus"
                  size={20}
                  style={{ color: '#fff', top: 12 }}
                />
                <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
              </ProductAmount>

              <ButtonText>ADICIONAR</ButtonText>
            </ProductButton>
          </Product>
        )}
      />
    </Container>
  );
}
