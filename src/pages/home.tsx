import Main from '@components/Center';
import Left from '@components/Left';
import Right from '@components/Right';
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
