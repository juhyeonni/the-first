import { useState } from 'react';
import styled, { css } from 'styled-components';
import SearchExtend from './SearchExtend';
import CreatePostExtend from './CreatePostExtend';
import BoxIcon from '@assets/icons/box';
import EtcIcon from '@assets/icons/etc';
import HomeIcon from '@assets/icons/home';
import LogoIcon from '@assets/icons/logo';
import SearchIcon from '@assets/icons/search';
import useModal from '@hooks/useModal';
import useToggle from '@hooks/useToggle';

interface NavItem {
  id: string;
  Icon: React.FC;
  label: string;
  callback: () => void;
}

const Sidebar = () => {
  const [selected, setSelected] = useState<string>('Home');
  const searchModal = useModal();
  const createPostModal = useModal();
  const othersToggler = useToggle();

  const handleClick = (item: NavItem) => {
    setSelected(item.id);
    item.callback();
  };

  const NAV_ITEMS = [
    {
      id: 'Home',
      Icon: HomeIcon,
      label: '홈',
      callback: () => {
        window.location.reload();
      },
    },
    {
      id: 'Search',
      Icon: SearchIcon,
      label: '검색',
      callback: () => {
        searchModal.toggler.toggle();
      },
    },
    {
      id: 'NewPost',
      Icon: BoxIcon,
      label: '새 게시물',
      callback: () => {
        createPostModal.toggler.open();
      },
    },
  ];

  return (
    <Container>
      <div className="title">
        <LogoIcon width={147} height={40} />
      </div>
      <nav>
        {NAV_ITEMS.map((item) => (
          <Interact
            key={item.id}
            data-id={item.id}
            onClick={() => handleClick(item)}
            $selected={selected === item.id}
          >
            <item.Icon />
            <span>{item.label}</span>
          </Interact>
        ))}
        {/* TODO: Others 좀 더 가독성 높도록 수정해야 함 */}
        <Others>
          <div className="others" onClick={othersToggler.toggle}>
            <EtcIcon />
            <span>더 보기</span>
          </div>
          {othersToggler.isOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                zIndex: 1,
                width: '266px',
                padding: '8px',
                border: '1px solid black',
                borderRadius: '8px',
              }}
            >
              <span>asdfsd</span>
            </div>
          )}
        </Others>
      </nav>
      <SearchExtend
        open={searchModal.toggler.isOpen}
        observe={searchModal.ref}
      />
      <CreatePostExtend
        open={createPostModal.toggler.isOpen}
        observe={createPostModal.ref}
      />
    </Container>
  );
};

export default Sidebar;

const Container = styled.div<{ $open?: boolean }>`
  display: flex;
  position: fixed;
  flex-direction: column;
  height: 100%;
  width: var(--nav-medium-width);
  z-index: 1;
  transition: width 0.3s ease-in-out;

  border: 1px solid black;

  background-color: ${({ theme }) => theme.lightTheme.bgColor};
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  & > div.title {
    display: flex;
    align-items: center;
    height: 4rem;
    margin-bottom: 1rem;
    padding: 25px 12px 16px 12px;
  }

  & > nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 0.5rem;
    height: 100%;
  }

  @media ${({ theme }) => theme.windowSize.lg} {
    width: var(--nav-narrow-width);
  }
`;

const Interact = styled.div<{
  'data-id': string;
  $selected?: boolean;
}>`
  padding: 12px;
  margin: 4px 0 4px;
  height: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  /* FIXME: */
  border: 1px solid orange;

  @media ${({ theme }) => theme.windowSize.lg} {
    & > span {
      display: none;
    }
  }

  &:hover {
    backdrop-filter: brightness(0.9);

    & svg {
      stroke: black;
      stroke-width: 1;
    }
  }

  ${({ $selected }) =>
    $selected &&
    css`
      & svg {
        stroke: black;
        stroke-width: 1;
      }
    `}
`;

const Others = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  position: relative;
  margin-bottom: 1rem;

  & > div.others {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.5rem;
    padding: 12px;
    height: 1.5rem;
    cursor: pointer;
    border: 1px solid orange;

    @media ${({ theme }) => theme.windowSize.lg} {
      & > span {
        display: none;
      }
    }
  }
`;

Interact.defaultProps = {
  'data-id': 'Interact',
};
