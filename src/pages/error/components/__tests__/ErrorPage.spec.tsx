import { screen } from '@testing-library/react';
import { vi } from 'vitest';

import customRender from '@/utils/test/render';
import { ErrorPage } from '../ErrorPage';

// react-router-dom 모듈 모킹
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockNavigate = vi.fn();

describe('ErrorPage', () => {
  it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
    // Arrange: ErrorPage 컴포넌트를 렌더링
    const { user } = await customRender(<ErrorPage />);

    // Act: "뒤로 이동" 버튼을 클릭
    const backButton = await screen.findByText('뒤로 이동');
    await user.click(backButton);

    // Assert: navigate 함수가 -1 인자로 호출되었는지 확인
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});