export default function GalleryIcon({ type }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {type === 'search' && <><circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5 5" /></>}
      {type === 'upload' && <><path d="M12 15V3m-5 5 5-5 5 5M4 13v8h16v-8" /></>}
    </svg>
  )
}

