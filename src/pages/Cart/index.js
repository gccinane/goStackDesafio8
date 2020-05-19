import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../Components/Header';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import RemoveIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as CartActions from '../../store/modules/cart/actions';

import {
  ProductDetails,
  Container,
  Product,
  ProductList,
  ProductImage,
  ProductDescription,
  Products,
  ProductPrice,
  ButtonText,
  DeleteButton,
  AddButton,
  RemoveButton,
  Amount,
  ProductSubtotal,
  ProductControl,
  TotalContainer,
  TotalDescripton,
  TotalValue,
  OrderButton,
} from './styles';

export default function Cart({ navigation }) {
  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: product.price * product.amount,
    }))
  );

  const total = useSelector(state =>
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  );

  const dispatch = useDispatch();

  function decrement(product) {
    handleUpdate(product.amount - 1, product.id);
  }

  function increment(product) {
    handleUpdate(product.amount + 1, product.id);
  }

  function handleUpdate(value, id) {
    dispatch(CartActions.updateAmountRequest(id, value));
  }

  function handleDelete(id) {
    dispatch(CartActions.removeFromCart(id));
  }

  return (
    <Container>
      <Header navigation={navigation} />
      <Products>
        <ProductList
          data={cart}
          keyExtractor={product => product.id.toString()}
          renderItem={({ item }) => (
            <Product>
              <ProductDetails>
                <ProductImage source={{ uri: item.image }} />
                <ProductDescription>{item.title}</ProductDescription>
                <ProductPrice>{item.price}</ProductPrice>
                <DeleteButton onPress={() => handleDelete(item.id)}>
                  <DeleteIcon name="delete" size={25} color="#7159c1" />
                </DeleteButton>
              </ProductDetails>
              <ProductControl>
                <RemoveButton onPress={() => decrement(item)}>
                  <RemoveIcon name="minus" size={30} color="#7159c1" />
                </RemoveButton>

                <Amount>{item.amount}</Amount>

                <AddButton onPress={() => increment(item)}>
                  <AddIcon name="add" size={30} color="#7159c1" />
                </AddButton>
                <ProductSubtotal maxLength={10}>
                  R${item.subtotal}
                </ProductSubtotal>
              </ProductControl>
            </Product>
          )}
        />
      </Products>

      <TotalContainer>
        <TotalDescripton>TOTAL</TotalDescripton>
        <TotalValue maxLength={8}>R${total}</TotalValue>
        <OrderButton>
          <ButtonText>FINALIZAR PEDIDO</ButtonText>
        </OrderButton>
      </TotalContainer>
    </Container>
  );
}
