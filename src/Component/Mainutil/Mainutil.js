import React from 'react'
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

export default function Mainutil({children}) {
  const Mode = useSelector(state => state.mode);
  const SmallScreen = useMediaQuery({ query: '(min-width: 850px)' })
  return (
    <div className={`h-full flex ${SmallScreen ? "basis-4/5" : "basis-full"} w-full px-5 py-5 gap-x-5 rounded-xl justify-between gap-y-10 flex-wrap overflow-scroll no-scrollbar ${Mode.secondarybox}`}>
        {children}
    </div>
  )
}
