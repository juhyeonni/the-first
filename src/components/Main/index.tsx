import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PostAndUser } from '@interfaces/post.interface';
import Story from './Story';
import MainCard from './MainCard';
// eslint-disable-next-line import/order
import { getPostsUsers } from '@services/posts.service';

const Main = () => {
  const [mainPosts, setMainPosts] = useState<PostAndUser[]>([]);

  /* post 데이터 가져오기  */
  useEffect(() => {
    getPostsUsers()
      // eslint-disable-next-line no-shadow
      .then((posts) => {
        console.log('index.tsx에서 getPostsUsers 작동');
        console.log(posts); // 가져온 포스트 출력
        setMainPosts(posts);
      })
      .catch((err) => {
        console.error(err); // 에러 발생 시 출력
      });
  }, []);
  return (
    <Container>
      <Story />
      {/* 메인 카드 작성 */}
      <div style={{ margin: '0 auto' }}>
        {mainPosts.map((post) => (
          <MainCard key={post.id} post={post} />
        ))}
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
