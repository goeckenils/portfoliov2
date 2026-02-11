import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px', // slight rounded corners for favicon
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.1369 23.5714L28.3222 29.4755C27.8903 29.9141 27.1898 29.9141 26.7579 29.4755L26.7556 29.4732C26.3237 29.0346 26.3237 28.3234 26.7556 27.8848L30.7902 23.7882C31.2221 23.3497 31.2221 22.6384 30.7902 22.1999L24.0219 15.3274L24.023 15.3263L22.4587 13.7379L22.4633 13.7332V1.12529C22.4633 0.124702 21.272 -0.376294 20.5752 0.331228L0.326154 20.8938C-0.37065 21.6013 0.122987 22.811 1.10842 22.811H13.0651C13.3586 22.811 13.6398 22.6927 13.8471 22.4822L19.724 16.5149C20.1559 16.0763 20.8564 16.0763 21.2883 16.5149C21.7202 16.9534 21.7202 17.6647 21.2883 18.1032L17.2526 22.201C16.8207 22.6396 16.8207 23.3508 17.2526 23.7894L25.5875 32.2525L25.5864 32.2537L25.5873 44.8747C25.5873 45.8753 26.7787 46.3763 27.4755 45.6688L47.6738 25.1598C48.3706 24.4522 47.8772 23.2425 46.8918 23.2425H34.9192C34.6257 23.2425 34.3445 23.3609 34.1371 23.5714H34.1369Z"
            fill="white"
          />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
