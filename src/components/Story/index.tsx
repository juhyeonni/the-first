import styled from 'styled-components';
import { Mousewheel, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StoryContentType } from '@/types/StoryType';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SwiperBoxProps {
  data: StoryContentType[];
}

const SwiperContainer = styled(Swiper)`
  width: 100%;
  height: 100%;
  border-radius: 4vmin;
  overflow: hidden;
`;

const Slide = styled(SwiperSlide)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  color: #000;
  z-index: 1;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function SwiperBox({ data }: SwiperBoxProps) {
  return (
    <SwiperContainer
      modules={[Mousewheel, Navigation]}
      mousewheel
      allowTouchMove={false}
      navigation
    >
      {data?.map((item) => (
        <Slide key={item.id}>
          <img src={item.img} alt="" />
        </Slide>
      ))}
    </SwiperContainer>
  );
}

export default SwiperBox;
