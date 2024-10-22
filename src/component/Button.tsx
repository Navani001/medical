import React from 'react'

function Button({ select,text,style }: { select: number,text:string,style:string }) {

  return (
    <span style={{
    
    }} className={select==0?'p-2  bg-[#007965] flex h-10 rounded-lg text-white font-medium' +style :'p-2 border-2 text-[#0E1824] border-gr flex h-10 rounded-lg font-medium' + style}>{text}</span>
  )
}

export default Button