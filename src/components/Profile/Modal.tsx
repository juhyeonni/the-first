import { PostWithUser } from '@interfaces/post.interface';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

type ModalProps = {
  post: PostWithUser;
  onClose: () => void;
};

const Modal = ({ post, onClose }: ModalProps) => {
  const closeModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  /* 게시글 삭제 드롭다운 */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOpenDropdown = () => {
    isDropdownOpen ? setIsDropdownOpen(false) : setIsDropdownOpen(true);
  };

  useEffect(() => {
    console.log(post);
  }, []);

  return (
    <ModalBackgroundStyle>
      <ButtonStyle onClick={closeModal}>×</ButtonStyle>
      <ModalStyle>
        <PostWrapperStyle>
          <ImgStyle src={post.photos[0]} alt="" />
          <PostContainerStyle>
            <WriterStyle>
              <p>{post.user.username}</p>
              <img
                src="/public/main_imgs/three_dot.png"
                style={{
                  position: 'absolute',
                  right: '20px',
                  width: '20px',
                  height: '20px',
                  marginTop: '10px',
                  cursor: 'pointer',
                }}
                onClick={handleOpenDropdown}
              />
              {isDropdownOpen && (
                <div
                  style={{
                    width: '100px',
                    position: 'absolute',
                    right: '2%',
                    top: '8%',
                    backgroundColor: 'white',
                    border: '1px solid gray',
                    borderRadius: '5px',
                    textAlign: 'center',
                    zIndex: 1,
                  }}
                >
                  {/* 드롭다운 내용 */}
                  <p>게시글 수정</p>
                  <p style={{ color: 'red' }}>게시글 삭제</p>
                </div>
              )}
            </WriterStyle>
            <HrStyle />
            <ContentStyle>
              <PostStyle>
                <span style={{ height: '45px' }}>{post.user.username}</span>
                &nbsp;
                <span style={{ width: '405px', height: '45px' }}>
                  {post.content}
                </span>
              </PostStyle>
            </ContentStyle>
            <HrStyle />
            <PostInfoStyle>
              <p>{new Date(post.updated_at).toLocaleString()}</p>
            </PostInfoStyle>
          </PostContainerStyle>
        </PostWrapperStyle>
      </ModalStyle>
    </ModalBackgroundStyle>
  );
};

const ModalBackgroundStyle = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonStyle = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  color: white;
  font-size: 3em;
  cursor: pointer;
  z-index: 2;
`;

const ModalStyle = styled.div`
  background: white;
  border-radius: 5px;
  position: absolute;
  right: 8%;
`;

const PostWrapperStyle = styled.div`
  width: 1100px;
  height: 650px;
  position: relative;
  display: flex;
`;

const PostContainerStyle = styled.div`
  width: 500px;
  height: 400px;
  line-height: 1.5;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const WriterStyle = styled.div`
  height: 40px;
  padding: 10px;
  display: flex;
  line-height: 2.5;
`;

const HrStyle = styled.hr`
  margin: 0 0 0 0;
  width: 498px;
  position: absolute;
  right: 0;
  opacity: 0.3;
`;

const ImgStyle = styled.img`
  width: 600px;
  height: 650px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const ContentStyle = styled.div`
  width: 480px;
  height: 500px;
  padding: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostStyle = styled.div`
  width: 480px;
  display: flex;
  // border: 1px solid black;
`;

const PostInfoStyle = styled.div`
  height: 90px;
  padding: 10px;
`;

export default Modal;
