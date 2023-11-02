import styled from 'styled-components';
import Story from './Story';

const Main = () => {
  return (
    <Container>
      <Story />
    </Container>
  );
};

export default Main;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
