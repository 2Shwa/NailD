export const headerLinks = ['Home', 'Design', 'Gallery', 'Community']

export const designCards = [
  { name: '네일 이름', author: '작성자 아이디', likes: '1.5k', className: 'checker' },
  { name: '네일 이름', author: '작성자 아이디', likes: '1.5k', className: 'petal' },
  { name: '네일 이름', author: '작성자 아이디', likes: '1.5k', className: 'ribbon' },
  { name: '네일 이름', author: '작성자 아이디', likes: '1.5k', className: 'pearl' },
]

export const communityPosts = Array.from({ length: 18 }, (_, index) => ({
  id: `post-${index + 1}`,
  category: '[정보]',
  title: '게시글 제목',
  comments: 5,
  date: '2026.05.31',
}))

export const footerColumns = [
  { title: 'Design', links: ['네일 디자인하기', '나의 디자인'] },
  { title: 'Gallery', links: ['디자인 구경하기', '저장한 디자인'] },
  { title: 'Community', links: ['게시글 구경하기', '나의 게시글'] },
  { title: 'Support', links: ['문의하기', '버그 제보'] },
]
