/* --------------------------------------import-------------------------------------- */
import React, { useState, Component, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { patchHeart } from '@services/posts.service';
import axios from 'axios'; // axios import

/* 📎폰트 어썸 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  faEllipsis,
  faHeart as solidHeart,
} from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  faHeart as regularHeart,
  faComment,
} from '@fortawesome/free-regular-svg-icons';

/* 📎캐러셀 */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';

/* 📎 인터페이스 : MainCardProps */
import { PostAndUser } from '@interfaces/post.interface';

/* --------------------------------------import-------------------------------------- */

interface MainCardProps {
  post: PostAndUser;
}

/* -------------------------------------MainCard------------------------------------- */
const MainCard = ({ post }: MainCardProps): JSX.Element => {
  /*  📝 사용자 게시글 입력 */
  const textContent = post.content;
  const maxLength = 30; // 원하는 글자 수

  /* 📂 1. 게시글 flug */
  const [isTextShown, setIsTextShown] = useState(false);

  /* 📂 2. 하트 flug  */
  const [isHeartShown, setIsHeartShown] = useState(post.heart);

  /* 📂 3. 바운스 flug */
  const [bounce, setBounce] = useState(false);

  /* 📂 4. 게시글 코멘트 */
  const [postComment, setPostComment] = useState('');

  // 2.1 물리적 하트 변경
  const toggleHeart = () => {
    setIsHeartShown((prev) => !prev);
  };

  // 2.2 json 서버 제공
  const changeHeart = async () => {
    const res = await patchHeart({ ...post, heart: isHeartShown });
    console.log(res);
    console.log(isHeartShown);
  };

  // 2.3 json 서버 하트 변경
  useEffect(() => {
    changeHeart();
  }, [isHeartShown]);

  // FIXME: 코맨트 추가
  const handleCommentChange = (e) => {
    // 댓글의 변화를 다루는 함수입니다.
    setPostComment(e.target.value);
    // console.log(postComment);
  };

  return (
    <StyledMainCard>
      {/* 🟢 1. 상단 bar 🟢 */}
      <div className="element-top">
        {/* 1.1 상단 좌측 유저 이미지 */}
        <div className="element-image">
          <img
            className="element-userImg"
            alt="Element userImg"
            src={post.user.avatar} /* 🟡 사용자 이미지 입력 🟡  */
          />
        </div>

        {/* 1.2 상단 좌측 아이디 */}
        <div className="element-account">
          <span className="userId">
            {post.user.name} {/* 🟡 사용자 아이디 입력 🟡 */}
            {/* 1.2.1 파란색 체크 이미지 */}
            <img
              className="element-userImg"
              alt="Element userImg"
              src="/main_imgs/blue_check.png"
              style={{ width: '30px', height: '30px', marginLeft: '10px' }}
            />
          </span>
        </div>

        {/* 1.3 우측 상단 ・・・ 아이콘 */}
        <FontAwesomeIcon
          className="faEllipsis"
          icon={faEllipsis}
          style={{ color: '#000000' }}
        />
      </div>

      {/* 🟢 2. 메인 이미지 🟢 */}
      <div className="mainImg_container">
        {/* 2.1 캐러셀 */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <StyledSlider {...settings}>
          {/* 🟡 map 메서드로 , 게시 사진 수 만큼 생성 🟡 */}
          {post.imgs.map((img) => (
            <div key={post.id} className="mainImg_box">
              <img
                className="element-userImg"
                alt="Element userImg"
                src={img}
              />
            </div>
          ))}
        </StyledSlider>
      </div>

      {/* 🟢 3. 좋아요  + 게시글 모달 🟢 */}
      <div className="element-wrap-image">
        {/* 3.1 좋아요  */}
        {isHeartShown ? (
          /* 3.1.1 ❤️ */
          <FontAwesomeIcon
            bounce={bounce}
            className="solidHeart"
            icon={solidHeart}
            onClick={toggleHeart}
          />
        ) : (
          /* 3.1.2 ♡ */
          <StyledSolidHeart
            className="regularHeart"
            icon={regularHeart}
            onClick={() => {
              toggleHeart();
              setBounce(true);
              setTimeout(() => setBounce(false), 1000);
            }}
          />
        )}

        {/* 3.2  🔍 */}
        <FontAwesomeIcon
          className="comment"
          icon={faComment}
          flip="horizontal"
        />
      </div>

      {/* 🟢 4. 아이디 + 게시글 작성 내용 🟢 */}
      <div className="element-content">
        {/* 4.1 사용자 아이디 */}
        {/* 🟡 사용자 아이디 입력 🟡 */}
        <span className="userId">cheiru94</span>

        {/* 4.2 게시글 내용 */}
        <span className="element-contents">
          {/* 30글자 이상일 시 더보기 or 닫기 toggle */}
          {/* eslint-disable-next-line no-nested-ternary */}
          {textContent.length > maxLength
            ? isTextShown
              ? textContent
              : `${textContent.substring(0, maxLength)}...`
            : textContent}
          {textContent.length > maxLength && (
            <button type="button" onClick={() => setIsTextShown(!isTextShown)}>
              {isTextShown ? '접기' : '더보기'}
            </button>
          )}
        </span>
      </div>

      {/* 🟢 5. 댓글 달기  🟢 */}
      <div className="element-comment">
        <div className="element">
          <textarea
            className="text-wrapper"
            placeholder="댓글 달기..."
            onChange={handleCommentChange}
          />
        </div>
        <button
          type="button"
          className="element-upload"
          // FIXME: 코맨트 추가
        >
          게시
        </button>
      </div>
      {/* <div className="frame" /> */}
    </StyledMainCard>
  );
};
/* -------------------------------------MainCard------------------------------------- */

/* -------------------------------------💅💅Styled Component------------------------------------- */
//  바운스 키프레임
const bounceAnimation = keyframes`
  0%, 100% {
    transform: scale(1.0);
  }
  50% {
    transform: scale(1.1);
  }
`;

// FontAwesomeIcon에 바운스 적용
const StyledSolidHeart = styled(FontAwesomeIcon)`
  animation: ${(props) =>
    props.bounce
      ? css`
          ${bounceAnimation} 1s infinite
        `
      : 'none'};
`;

const StyledMainCard = styled.div`
  /* 전체 Main div */
  margin-top: 30px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1px;
  position: relative;
  height: auto;
  width: 550px;
  box-sizing: content-box;
  margin-bottom: 100px;

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
    object-fit: cover;
  }

  /* 🟢 1.2 Top. 아이디 wrap div */
  & .element-account {
    flex-direction: column;
    padding: 9.27px 9.27px 9.27px 10.01px;
    position: relative;
    width: 77%;
  }

  /* 1.2.1 Top. 아이디 입력 상자  */
  & .userId {
    font-size: 25px;
    font-weight: 600;
  }

  /* 1.3 Top. 우측 상단 ・・・ 아이콘 */
  & .element-threeDot {
    height: 40px;
    position: relative;
    width: 40px;
    margin-right: 5px;
    cursor: pointer;
  }

  & .faEllipsis {
    height: 40px;
    position: relative;
    width: 40px;
    margin-right: 5px;
    cursor: pointer;
  }

  /* 🟢🟢🟢🟢🟢🟢 2 Main. 메인 이미지 🟢🟢🟢🟢🟢🟢*/
  & .mainImg_container {
    width: 100%;
    height: 500px;
    margin-bottom: 10px;
    background-color: white;
  }

  & .mainImg_box {
    display: flex; // 추가
    align-items: center; // 추가
  }

  & .mainImg_box img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 5px;
  }

  & .element-wrap-image {
    display: flex;
    margin-bottom: 10px;
  }

  /* 하트 아이콘 */
  & .solidHeart {
    color: #ff0000;
    height: 60px;
    width: 60px;
    cursor: pointer;
  }
  /* 빈하트 아이콘 */
  & .regularHeart {
    height: 60px;
    width: 60px;
    cursor: pointer;
  }
  /* 코멘트 아이콘 */
  & .comment {
    height: 60px;
    width: 60px;
    margin-left: 30px;
    cursor: pointer;
  }

  /*  아이디 + 작성 내용 ...* */
  & .element-content {
    align-items: start;
    margin-bottom: 20px;
    border-radius: 4.63px;
    display: block;

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
    display: flex;
    gap: 5.72px;
    height: 59px;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  /* 댓글달기 .... */
  & .element {
    align-items: center;
    background-color: #ffffff;
    display: flex;
    gap: 12.52px;
    /* height: 100%; */
    margin-bottom: -3px;
    margin-top: -3px;
    /* padding: 12.52px; */
    position: relative;
    width: 100%;
  }

  & .element textarea.text-wrapper {
    border: none;
    border-bottom: 1px solid black;
    color: #000000;
    font-family: 'Inter-Regular', Helvetica;
    font-size: 23px;
    font-weight: 400;
    letter-spacing: 0;
    /* line-height: normal; */
    position: relative;
    /* white-space: normal; */
    overflow: auto;
    width: 100%;
    height: 50%;
    resize: none;

    /* &::-webkit-scrollbar {
      display: none;
    } */
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

/* 🟡 캐러셀 스타일링 始🟡 */
const settings: Settings = {
  infinite: true, // 무한 롤링
  speed: 500, // 애니메이션 속도
  slidesToShow: 1, // 한 번에 슬라이드 되는 이미지 개수
  slidesToScroll: 1, // 스크롤시 이동하는 이미지 개수
  arrows: true,
  dots: true,
};

const StyledSlider = styled(Slider)`
  & .slick-dots {
    display: flex !important;
    justify-content: center;
    align-items: center;
    bottom: 24px;
    width: 100%;
    position: absolute;
  }

  & .slick-dots li {
    width: 1px;
    height: 1px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid rgba(255, 255, 255, 0.7);
  }

  & .slick-dots li button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .slick-dots li button:before {
    display: block;
    position: initial;
  }

  /* < 좌측 화살표  */
  & .slick-prev {
    left: 8px;
    z-index: 1;

    &::before {
      color: #ffffff;
    }
  }

  /* > 우측 화살표  */
  & .slick-next {
    right: 8px;
    z-index: 1;

    &::before {
      color: #ffffff;
    }
  }
`; /* 🟡 캐러셀 스타일링 終🟡 */
/* -------------------------------------Styled Component------------------------------------- */

export default MainCard;
