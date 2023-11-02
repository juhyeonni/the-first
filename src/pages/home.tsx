import Main from '@components/Center/Main';
import Left from '@components/Left/Left';
import Right from '@components/Right/Right';
import styled from 'styled-components';

function HomePage() {
  return (
    <Container>
      {/* left nav */}
      <Left />
      {/* main */}
      <Main />
      {/* right */}
      <Right />
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;
