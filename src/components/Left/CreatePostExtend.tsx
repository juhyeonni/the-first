import { Ref, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import InputArea from './InputArea';
import PlusIcon from '@assets/icons/plus';

interface CreatePostExtendProps {
  open?: boolean;
  observe?: Ref<HTMLDivElement>;
}

enum PostFlow {
  Photo,
  Form,
}

const useText = (initValue?: string) => {
  const [text, setText] = useState<string>(initValue || '');

  const handler = {
    input: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    clear: () => setText(''),
    add: (text: string) => setText((p) => p + text),
  };

  return [text, handler] as const;
};

const useFlow = () => {
  const [flow, setFlow] = useState<PostFlow>(PostFlow.Photo);

  const handler = {
    next: () => setFlow((p) => p + 1),
    prev: () => setFlow((p) => p - 1),
  };

  return [flow, handler] as const;
};

const usePhotos = () => {
  const [photos, setPhotos] = useState<File[]>([]);

  const handler = {
    add: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target?.files) return;
      const newPhotos = Array.from(e.target.files);
      setPhotos((p) => [...p, ...newPhotos]);
    },
    clear: () => setPhotos([]),
    remove: (index: number) => {
      setPhotos((p) => p.filter((_, i) => i !== index));
    },
  };

  return [photos, handler] as const;
};

const CreatePostExtend = (props: CreatePostExtendProps) => {
  const [text, textHandler] = useText();
  const [flow, flowHandler] = useFlow();
  const [photos, photoHandler] = usePhotos();
  const containerVariants = {
    open: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 220,
        damping: 20,
      },
    },
    closed: {
      scale: 0.5,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
      },
    },
  };

  useEffect(() => {
    console.log('TEST; photos: ', photos);

    if (photos.length === 0 && flow === PostFlow.Form) flowHandler.prev();
  }, [photos]);

  const handler = {
    post: () => {
      console.log('posted');
      photoHandler.clear();
    },
  };

  return (
    <>
      <BackgroundLayer ref={props.observe} $open={props.open}>
        <Container
          variants={containerVariants}
          initial="closed"
          animate={props.open ? 'open' : 'closed'}
          layout="preserve-aspect"
        >
          <Header>
            {flow === PostFlow.Photo && (
              <>
                <div />
                <h3>새 게시물 만들기</h3>
                <div />
              </>
            )}
            {flow === PostFlow.Form && (
              <>
                <button onClick={flowHandler.prev}>{'<'}</button>
                <h3>게시물 만들기</h3>
                <button onClick={handler.post}>공유</button>
              </>
            )}
          </Header>

          <HrLine />
          <Content>
            {flow === PostFlow.Photo && (
              <>
                <div
                  style={{
                    display: 'flex',
                    width: '360px',
                    height: '360px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <label
                    htmlFor="photos"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      rowGap: '1rem',
                      cursor: 'pointer',
                    }}
                  >
                    <PlusIcon width={64} height={64} />
                    <span>컴퓨터에서 선택</span>
                    <input
                      id="photos"
                      type="file"
                      multiple
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        photoHandler.add(e);
                        flowHandler.next();
                      }}
                    />
                  </label>
                </div>
              </>
            )}

            {flow === PostFlow.Form && (
              <>
                <div style={{ display: 'flex' }}>
                  <ImageContainer>
                    <ImageSlider
                      images={photos}
                      deleteHandler={(e) => {
                        photoHandler.remove(e);
                        if (photos.length === 0) flowHandler.prev();
                      }}
                    />
                    <AddPhoto>
                      <label htmlFor="photos">
                        <PlusIcon />
                      </label>
                      <input
                        id="photos"
                        type="file"
                        multiple
                        hidden
                        accept="image/*"
                        onChange={photoHandler.add}
                      />
                    </AddPhoto>
                  </ImageContainer>
                  <VrLine />
                  {/* user input form */}
                  <UserInputForm>
                    <Author>
                      <div className="avatar">
                        <img src="https://github.com/juhyeonni.png" alt="" />
                      </div>
                      <span>asdf</span>
                    </Author>
                    <div className="content">
                      <InputArea text={text} textHandler={textHandler} />
                    </div>
                    <HrLine />
                    <div className="placeinput"></div>
                  </UserInputForm>
                </div>
              </>
            )}
          </Content>
        </Container>
      </BackgroundLayer>
    </>
  );
};

export default CreatePostExtend;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: auto;

  border: 1px solid black;
  border-radius: 12px;

  @media screen and (max-height: 500px) {
    height: calc(100vh - 40px);
  }

  background-color: ${({ theme }) => theme.lightTheme.bgColor};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

const Content = styled.div`
  display: flex;
`;

const HrLine = styled.hr<{ $strong?: boolean }>`
  border: 0;
  border-top: ${({ theme }) => theme.lightTheme.borderColor};
  margin: 0;
`;

const VrLine = styled.div`
  border-left: ${({ theme }) => theme.lightTheme.borderColor};
  margin: 0;
`;

const BackgroundLayer = styled.div<{ $open?: boolean }>`
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};

  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;

const ImageContainer = styled.div`
  position: relative;
  height: fit-content;
`;

const UserInputForm = styled.div`
  padding: 0.5rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.lightTheme.borderColor};

  & > div.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  & > span {
    font-weight: bold;
  }
`;

const AddPhoto = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5rem;

  & > label {
    cursor: pointer;
  }
`;
