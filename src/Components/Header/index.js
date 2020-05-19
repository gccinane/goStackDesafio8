import React from 'react';
import { useSelector } from 'react-redux';
import img from '../../assets/logo.png';
import { Container, Logo, LogoButton, IconButton, IconText } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);
  function handleNavigate(page) {
    navigation.navigate(page);
  }

  return (
    <Container>
      <LogoButton onPress={() => handleNavigate('Main')}>
        <Logo source={img} resizeMode="stretch" />
      </LogoButton>

      <IconButton onPress={() => handleNavigate('Cart')}>
        <Icon
          name="basket"
          size={25}
          color="#eee"
          style={{ position: 'relative', marginLeft: 90, marginTop: 13 }}
        />
        <IconText>{cartSize}</IconText>
      </IconButton>
    </Container>
  );
}
