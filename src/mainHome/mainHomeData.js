export const headerLinks = ['Home', 'Design', 'Gallery', 'Community']

export const heroContent = {
  titleLines: ['나만의 네일 디자인', '상상하는 그대로'],
  descriptionLines: [
    '디자인부터 공유, 소통까지 한 곳에서',
    '나만의 네일을 디자인하고 다양한 작품을 자유롭게 탐색해보세요.',
  ],
  actions: [
    { label: '디자인하러 가기', variant: 'primary' },
    { label: '디자인 구경하기', variant: 'secondary' },
  ],
}

export const designCards = [
  { name: '체커 핑크', author: '작성자 아이디', likes: '1.5k', pattern: 'checker' },
  { name: '블러썸 페탈', author: '작성자 아이디', likes: '1.5k', pattern: 'petal' },
  { name: '리본 글로우', author: '작성자 아이디', likes: '1.5k', pattern: 'ribbon' },
  { name: '펄 드롭', author: '작성자 아이디', likes: '1.5k', pattern: 'pearl' },
]

export const communityPosts = Array.from({ length: 18 }, (_, index) => ({
  id: `post-${index + 1}`,
  category: '[정보]',
  title: '게시글 제목',
  comments: 5,
  date: '2026.05.31',
}))

export const footerColumns = [
  {
    title: 'Design',
    links: [
      { label: '네일 디자인하기', page: 'Design' },
      { label: '나의 디자인', page: 'MyDesign' },
    ],
  },
  {
    title: 'Gallery',
    links: [
      { label: '디자인 구경하기', page: 'Gallery' },
      { label: '저장한 디자인', page: 'SavedDesign' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: '게시글 구경하기', page: 'Community' },
      { label: '나의 게시글', page: 'MyPosts' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: '문의하기', page: 'Contact' },
      { label: '버그 제보', page: 'BugReport' },
    ],
  },
]
