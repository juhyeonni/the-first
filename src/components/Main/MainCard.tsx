import styled from 'styled-components';

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
  overflow: hidden;
  padding: 9.27px 9.27px 0px;
  position: relative;
  height: 950px;
  width: 700px;
  /* box-sizing: content-box; // 이 범위 안엣 다 해결 */

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
    position: absolute;
    object-fit: cover;
  }

  /* 🟢 1.2 Top. 아이디 wrap div */
  & .element-account {
    align-items: flex-start;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 9.27px;
    height: 85.26px;
    padding: 9.27px 9.27px 9.27px 10.01px;
    position: relative;
    width: 73%;
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
    cursor: pointer;
  }

  /* 2 Main. 메인 이미지 */
  & .element-main-image {
    border: 3.43px solid;
    border-color: #000000;
    margin-right: -0.53px;
    position: relative;
    width: 620px;
    height: 620px;
  }
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

  & .element-content {
    align-items: center;
    background-color: #4da9ff;
    border-radius: 4.63px;
    display: flex;
    gap: 12.52px;
    height: 68px;
    /* justify-content: center; */
    /* margin-right: -0.53px; */
    /* padding: 0px 12.52px; */
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  /* 아래 계정 아이디 */
  /* & .element-account-2 {
    height: 46.31px;
    margin-left: -3.54px;
    position: relative;
    width: 120.15px;
    padding: 8px;
  } */

  /* 사용자가 올린 글 */
  & .element-contents {
    /* background-color: red; */
    /* border: 1.14px solid;
    border-color: #000000; */
    margin-right: -3.54px;
    position: relative;
    height: 28px;
    width: 470px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .element-comment {
    align-items: center;
    align-self: stretch;
    background-color: orange;
    border-radius: 6.26px;
    display: flex;
    gap: 5.72px;
    height: 59px;
    justify-content: center;
    overflow: hidden;
    padding: 0px 2px 0px 1.25px;
    position: relative;
    width: 100%;
  }

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
    width: 371px;
  }

  & .text-wrapper {
    color: #000000;
    font-family: 'Inter-Regular', Helvetica;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    white-space: nowrap;
    width: fit-content;
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

/* --------------------------- 🟢 MainCard 🟢 --------------------------- */
const MainCard = (): JSX.Element => {
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
            cheiru94
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

      {/* ⭐ 메인 이미지 ⭐ */}
      <div className="element-main-image">
        <img
          className="element-userImg"
          alt="Element userImg"
          src="/main_imgs/blue_note1.png"
        />
      </div>
      {/* 중간 이미지 2개 짜리  */}
      <div className="element-wrap-image">
        {/* 하트 */}
        <img
          className="element-icons"
          alt="Element icons"
          src="/main_imgs/heart_off.png"
          style={{ cursor: 'pointer' }}
        />
        {/* 질문 */}
        <img
          className="element-icons"
          alt="Element icons"
          src="/main_imgs/question.png"
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className="element-content">
        {/* <div className="element-account-2"> */}
        <span className="userId">cheiru94</span>
        {/* </div> */}
        <div className="element-contents">
          ★ブルーノート東京35周年
          特設サイトオープン！インタビュー映像のフルバージョンは、こちらでご覧いただけます。
        </div>
      </div>
      <div className="element-comment">
        <div className="element">
          <div className="text-wrapper">댓글 달기 ....</div>
        </div>
        <div className="element-upload">게시</div>
      </div>
      <div className="frame" />
    </StyledMainCard>
  );
};

export default MainCard;
