import React, { FC } from 'react'

type EllipseDecorationProps = {}

const EllipseDecoration: FC<EllipseDecorationProps> = ({}) => {
  return (
    <>
      {/* Large ellipses behind */}
      <img
        src="/assets/images/ellipse.svg"
        alt=""
        className="absolute left-[-45px] bottom-[-45px] w-[120px] h-[120px] opacity-70 pointer-events-none select-none z-0"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      <img
        src="/assets/images/ellipse.svg"
        alt=""
        className="absolute left-[-38px] bottom-[-38px] w-[104px] h-[104px] opacity-70 pointer-events-none select-none z-0"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      {/* Small ellipses front */}
      <img
        src="/assets/images/ellipseSmall.svg"
        alt=""
        className="absolute left-[-31px] bottom-[-31px] w-[90px] h-[90px] opacity-80 pointer-events-none select-none z-0"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      <img
        src="/assets/images/ellipseSmall.svg"
        alt=""
        width={22}
        height={22}
        className="absolute left-[-23px] bottom-[-23px] w-[72px] h-[72px] opacity-80 pointer-events-none select-none z-0"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
    </>
  )
}

export default EllipseDecoration
