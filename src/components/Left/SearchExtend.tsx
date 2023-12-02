import { Ref, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SearchItem from './SearchItem';
import useAutoCallback from '@hooks/useAutoCallback';
import useLocalStorageHistory from '@hooks/useLocalStorageHistory';
import { SearchData } from '@interfaces/search.interface';
import { User } from '@interfaces/user.interface';
import { Tag } from '@interfaces/tag.interface';
import { Place } from '@interfaces/place.interface';
import { searchAll } from '@services/search.service';

interface SearchExtendProps {
  open?: boolean;
  observe?: Ref<HTMLDivElement>;
}

const useKeyword = () => {
  const [keyword, setKeyword] = useState<string>('');

  const handler = {
    input: (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    clear: () => setKeyword(''),
  };

  return [keyword, handler] as const;
};

const useNav = () => {
  const navigate = useNavigate();
  const { history, addHistory, clearHistory } = useLocalStorageHistory();

  const handler = {
    user: (user: User) => {
      addHistory({ type: 'user', data: user });
      navigate(`/${user.username}`);
    },
    tag: (tag: Tag) => {
      addHistory({ type: 'tag', data: tag });
      navigate(`/posts?tag=${tag.name}`);
    },
    place: (place: Place) => {
      addHistory({ type: 'place', data: place });
      navigate(`/posts?place=${place.name}`);
    },
  };

  return { history, navHandler: handler, clearHistory };
};

const SearchExtend = (props: SearchExtendProps) => {
  const [searchData, setSearchData] = useState<SearchData>({
    users: [],
    tags: [],
    places: [],
  });
  const [keyword, keywordHandler] = useKeyword();
  const { history, navHandler, clearHistory } = useNav();
  const isNarrow = useMediaQuery({ query: '(max-width: 1024px)' });
  const containerVariants = {
    open: {
      left: isNarrow ? 'var(--nav-narrow-width)' : 'var(--nav-medium-width)',
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 25,
      },
    },
    closed: {
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const handler = {
    search: async () => {
      const data = await searchAll(keyword);
      setSearchData(data);
    },
    clear: () => clearHistory(),
  };

  useAutoCallback([keyword], handler.search, 300);

  return (
    <>
      {props.open && <BackgroundLayer ref={props.observe} />}
      <Container
        variants={containerVariants}
        initial="closed"
        animate={props.open ? 'open' : 'closed'}
      >
        <h3>검색</h3>
        <Searchbar>
          <input
            id="searchInput"
            value={keyword}
            onChange={keywordHandler.input}
            type="text"
            placeholder="검색"
          />
          <button className="clear" onClick={keywordHandler.clear}>
            x
          </button>
        </Searchbar>

        {keyword ? (
          <SearchList>
            <div className="search-header">
              <h3>검색 결과</h3>
            </div>

            <div className="search-items">
              {searchData.users.map((item: User) => (
                <SearchItem
                  key={item.id}
                  data={item}
                  type="user"
                  callback={() => navHandler.user(item)}
                />
              ))}
              {searchData.tags.map((item: Tag) => (
                <SearchItem
                  key={item.id}
                  data={item}
                  type="tag"
                  callback={() => navHandler.tag(item)}
                />
              ))}
              {searchData.places.map((item: Place) => (
                <SearchItem
                  key={item.id}
                  data={item}
                  type="place"
                  callback={() => navHandler.place(item)}
                />
              ))}
            </div>
          </SearchList>
        ) : (
          <HistoryList>
            <div className="history-header">
              <h3>최근 검색 항목</h3>
              <button className="clear" onClick={handler.clear}>
                모두 지우기
              </button>
            </div>
            <div className="history-items">
              {history.map((item) => (
                <SearchItem
                  key={item.id}
                  data={item.data}
                  type={item.type}
                  callback={
                    item.type === 'user'
                      ? () => navHandler.user(item.data as User)
                      : item.type === 'tag'
                      ? () => navHandler.tag(item.data as Tag)
                      : item.type === 'place'
                      ? () => navHandler.place(item.data as Place)
                      : () => {}
                  }
                />
              ))}
            </div>
          </HistoryList>
        )}
      </Container>
    </>
  );
};

export default SearchExtend;

const Container = styled(motion.div)`
  width: 397px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
  top: 0;
  right: 100%;
  z-index: -1;

  /* FIXME: */
  border: 1px solid red;

  & > h3 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: bold;
    padding: 12px 0 36px 0;
  }
`;

const Searchbar = styled.div`
  margin-bottom: 36px;
  position: relative;
  padding: 0 16px 24px 16px;

  & > input {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.md};
  }

  & > button.clear {
    position: absolute;
    top: 0;
    right: 0;
    padding: 3px 16px 16px 3px;
  }
`;

const HistoryList = styled.div`
  & > div.history-header {
    display: flex;
    justify-content: space-between;
    margin: 6px 24px 8px;

    & > h3 {
      font-size: ${({ theme }) => theme.fontSize.base};
      font-weight: bold;
    }

    & > button.clear {
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: blue;
    }
  }

  & > div.history-items {
    margin: 8px 0;
  }
`;

const SearchList = styled.div``;

const BackgroundLayer = styled.div`
  position: fixed;
  left: var(--nav-medium-width);
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -2;

  @media ${({ theme }) => theme.windowSize.lg} {
    left: var(--nav-narrow-width);
  }
`;
