/* eslint-disable react/prop-types */
import React, { useState, Component } from 'react';
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';

import ArrowRightIcon from 'path-to-icons/ArrowRightIcon';
import ArrowLeftIcon from 'path-to-icons/ArrowLeftIcon';

const StyledMainCard = styled.div`
  /* 전체 Main div */
  margin-top: 30px;
  align-items: flex-start;
  border: 5.56px solid;
  border-color: #000000;
  border-radius: 15.75px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  /* overflow: hidden; */
  /* padding: 9.27px 9.27px 0px; */
  /* padding: 0 5px 0; */
  position: relative;
  height: auto;
  width: 80%;
  box-sizing: content-box; // 이 범위 안엣 다 해결

  /* 🟢 1 Top. top 전체 감싸는 div  */
  & .element-top {
    align-items: center;
    align-self: stretch;
    border-radius: 5.56px;
    display: flex;
    height: 100px;
    /* justify-content: center; */
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  /* 🟢 1.1 Top. 좌측 상단 이미지 틀 */
  & .element-image {
    border: 1.14px solid;
    border-color: #000000;
    height: 80px;
    width: 80px;
    position: relative;
    overflow: hidden;
    margin-right: 2px;
    border-radius: 50%;
    cursor: pointer;
  }
  /* 1.1.1 Top. 좌측 상단 이미지 */
  & .element-userImg {
    width: 100%;
    height: 100%;
    /* position: absolute; */
    object-fit: cover;
  }

  /* 🟢 1.2 Top. 아이디 wrap div */
  & .element-account {
    /* align-items: flex-start; */
    /* justify-content: center; */
    /* display: flex; */
    flex-direction: column;
    /* gap: 9.27px; */
    /* height: 85.26px; */
    padding: 9.27px 9.27px 9.27px 10.01px;
    position: relative;
    width: 77%;
    /* background-color: red; */
  }

  /* 1.2.1 Top. 아이디 입력 상자  */
  & .userId {
    font-size: 30px;
    font-weight: 600;
  }

  /* 1.3 Top. 우측 상단 ・・・ 이미지 */
  & .element-threeDot {
    height: 40px;
    position: relative;
    width: 40px;
    margin-right: 5px;
    cursor: pointer;
  }

  /* 🟢🟢🟢🟢🟢🟢 2 Main. 메인 이미지 🟢🟢🟢🟢🟢🟢*/
  & .element-main-image {
    border: 3.43px solid;
    /* border-color: #000000; */
    position: relative;
    width: 550px;
    height: 500px;
    /* overflow: hidden; */
  }
  /* 🟢🟢🟢🟢🟢🟢2 Main. 메인 이미지  🟢🟢🟢🟢🟢🟢*/

  & .element-wrap-image {
    display: flex; // 플렉스
  }

  & .element-icons {
    align-self: stretch;
    height: 50px;
    margin-right: 30px;
    position: relative;
    width: 100%;
  }

  /*  아이디 + 작성 내용 ...* */
  & .element-content {
    align-items: start;
    margin-bottom: 20px;
    border-radius: 4.63px;
    display: block;
    gap: 12.52px;

    position: relative;
    width: 100%;
    float: left;
    width: 100%;
    line-height: 1.5;
  }

  /* 사용자가 올린 글 */
  & .element-contents {
    /* position: relative; */
    font-size: 24px;
    width: 470px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  & .element-comment {
    align-items: center;
    align-self: stretch;
    justify-content: start;
    /* background-color: orange; */
    border-radius: 6.26px;
    display: flex;
    gap: 5.72px;
    height: 59px;
    overflow: hidden;
    /* padding: 0px 2px 0px 1.25px; */
    position: relative;
    width: 100%;
  }

  /* 댓글달기 .... */
  & .element {
    align-items: center;
    background-color: #ffffff;
    display: flex;
    gap: 12.52px;
    height: 65px;
    margin-bottom: -3px;
    margin-top: -3px;
    padding: 12.52px;
    position: relative;
    width: 80%;
  }

  & .element textarea.text-wrapper {
    border: none; // 테두리를 전부 없애줍니다
    border-bottom: 1px solid black;
    color: #000000;
    font-family: 'Inter-Regular', Helvetica;
    font-size: 25px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    white-space: normal;
    overflow: auto;
    width: 100%;
    height: 80%;
    resize: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  & textarea:focus {
    outline: none;
  }

  & .element-upload {
    color: #0500ff;
    font-family: 'Inter-Bold', Helvetica;
    font-size: 25px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    text-align: center;
    width: 67.58px;
  }

  & .frame {
    flex: 0 0 auto;
    margin-right: -0.53px;
    position: relative;
  }
`;

// 화살표 컴포넌트 정의
const NextArrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  style,
  onClick,
}) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    className={className}
    style={{ ...style, display: 'block', right: '10px' }}
    onClick={onClick}
  />
);

const PrevArrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  style,
  onClick,
}) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    className={className}
    style={{
      ...style,
      display: 'block',
      left: '30px',
      backgroundColor: 'red',
      position: 'absolute',
    }}
    onClick={onClick}
  />
);

// 캐러셀 설정
const settings: Settings = {
  dots: true, // 점 네비게이션 표시
  infinite: true, // 무한 롤링
  speed: 500, // 애니메이션 속도
  slidesToShow: 1, // 한 번에 슬라이드 되는 이미지 개수
  slidesToScroll: 1, // 스크롤시 이동하는 이미지 개수

  appendDots: (dots: any) => (
    <div
      style={{
        width: '100%',
        position: 'absolute',
        bottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Dots>{dots}</Dots>
    </div>
  ),
};

const Dots = styled.ul`
  & li {
    background: #fff;
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }
  & li.slick-active {
    background: #858484;
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }
`;

/* --------------------------- 🟢 MainCard 🟢 --------------------------- */
const MainCard = (): JSX.Element => {
  /* 게시글 더보기 */
  const [isTextShown, setIsTextShown] = useState(false);
  const textContent =
    '★ブルーノート東京35周年 特設サイトオープン！インタビュー映像のフルバージョンは、こちらでご覧いただけます。ブルーノート東京35周年 特設サイトオープン！インタビュー映像のフルバージョンは、こちらでご覧いただけます。';
  const maxLength = 30; // 원하는 글자 수

  return (
    <StyledMainCard>
      <div className="element-top">
        {/* 왼쪽 상단 유저 이미지 */}
        <div className="element-image">
          <img
            className="element-userImg"
            alt="Element userImg"
            src="/main_imgs/blue_giant.png"
          />
        </div>

        {/* 아이디 */}
        <div className="element-account">
          <span className="userId">
            cheiru94 {/* <- 🟡 사용자 아이디 입력 🟡 */}
            <img
              className="element-userImg"
              alt="Element userImg"
              src="/main_imgs/blue_check.png"
              style={{ width: '30px', height: '30px', marginLeft: '10px' }}
            />
          </span>
        </div>

        {/* 우측 상단 점 3개 */}
        <img
          className="element-threeDot"
          alt="Element threeDot"
          src="/main_imgs/three_dot.png"
        />
      </div>
      {/* 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢 */}
      {/* ⭐ 메인 이미지 ⭐ */}
      <div className="element-main-image">
        <Slider
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...settings}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          <div>
            <img
              className="element-userImg"
              alt="Element userImg"
              src="/main_imgs/blue_note1.png"
            />
          </div>
          <div>
            <img
              className="element-userImg"
              alt="Element userImg"
              src="/main_imgs/blue_note1.png"
            />
          </div>
        </Slider>
      </div>

      {/* 중간 이미지 2개  */}
      <div className="element-wrap-image">
        {/* 하트 img */}
        <img
          className="element-icons"
          alt="Element icons"
          src="/main_imgs/heart_off.png"
          style={{ cursor: 'pointer' }}
        />
        {/* 질문 img */}
        <img
          className="element-icons"
          alt="Element icons"
          src="/main_imgs/question.png"
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* 아이디 + 작성 내용 */}
      <div className="element-content">
        {/* 🟢 계정 */}
        <span className="userId">cheiru94</span>

        {/* 🟢 게시글 내용 */}
        <span className="element-contents">
          {isTextShown
            ? textContent
            : `${textContent.substring(0, maxLength)}...`}
          <button type="button" onClick={() => setIsTextShown(!isTextShown)}>
            {isTextShown ? '접기' : '더보기'}
          </button>
        </span>
      </div>
      <div className="element-comment">
        <div className="element">
          <textarea className="text-wrapper" />
        </div>
        <button type="button" className="element-upload">
          게시
        </button>
      </div>
      <div className="frame" />
    </StyledMainCard>
  );
};

export default MainCard;
