import styled from 'styled-components';
import Sidebar from './Sidebar';

const Left = () => {
  return (
    <Container>
      <Sidebar />
    </Container>
  );
};

export default Left;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  /* FIXME: */
  border: 1px solid red;
`;
