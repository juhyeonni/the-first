import styled from 'styled-components';
import Story from './Story';
import MainCard from './MainCard';

const Main = () => {
  return (
    <Container>
      <Story />
      <div style={{ margin: '0 auto' }}>
        <MainCard />
      </div>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
