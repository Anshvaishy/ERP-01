import * as React from "react"

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <path d="M52.024 52.024H2.423V39.794h49.601v12.23ZM27.223 27.224 2.423 2.423h49.601L27.223 27.224Z" fill="currentColor"/>
        <path d="m27.223 27.224 16.534-16.534h-33.068L27.223 27.224Z" fill="#fff"/>
        <path d="m2.423 2.423 24.8 24.8 24.801-24.8H2.423Zm45.132 45.132H6.892V44.263h40.663v3.293Z" fill="currentColor"/>
    </svg>
  )
}
