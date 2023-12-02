import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const variants = {
  hover: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
  click: {
    border: '3px dotted #fff',
    transition: {
      // 추가된 부분
      border: {
        duration: 1,
        type: 'spring',
      },
    },
  },
};

const Story = () => {
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();

  const onClick = () => {
    setIsClick(!isClick);

    setTimeout(() => {
      setIsClick(false);
      navigate('/story');
    }, 500);
  };

  return (
    <Container>
      <Wrapper>
        <StoryCard>
          <StoryProfile
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
          >
            <StroyCircle
              variants={variants}
              initial={false}
              animate={[isHover ? 'hover' : '', isClick ? 'click' : '']}
            />
            <StoryImage>
              <img src="https://picsum.photos/200/300" alt="" />
            </StoryImage>
          </StoryProfile>

          <StoryName>name</StoryName>
        </StoryCard>

        <StoryCard>
          <StoryProfile>
            <StroyCircle />
            <StoryImage>
              <img src="https://picsum.photos/200/300" alt="" />
            </StoryImage>
          </StoryProfile>
          <StoryName>name</StoryName>
        </StoryCard>
      </Wrapper>
    </Container>
  );
};

export default Story;

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const StoryCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const StoryProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 0.4rem;
`;

const StoryImage = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const StroyCircle = styled(motion.div)`
  position: absolute;
  width: 4rem;
  height: 4rem;
  box-sizing: border-box;
  border: 3px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(to right, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const StoryName = styled.div`
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
