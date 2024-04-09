import React from 'react'
import './tweets.css'
import { Avatar, AvatarFallback, AvatarImage } from '../@/components/ui/avatar'

export default function Tweets() {
  return (
<div className="tweet">
<div className="profile">
        <Avatar>
          <AvatarImage className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full '/>
          <AvatarFallback className='text-[#7B61FF] font-bold'>RF</AvatarFallback>
        </Avatar>
        <div className="profile-info">
          <h2 className='font-bold'>Ramzi Fkaier</h2>
          <p className='font-bold text-[#7B61FF]'>@r_fkaier</p>
        </div>
      </div>
    <div className="tweet-body">
      Je ne combats pas les personnes, je m'attaque aux idées. » Tenir ce genre de position, c’est appartenir au camp des personnes raisonnables, voire à celui du bien. L'idée est de s’auto-positionner au-dessus des
    </div>
    <div className="tweet-actions">
      <div className="tweet-action likes">
        18
      </div>
      <div className="tweet-action dislikes">
        10
      </div>
    </div>
  </div>
  )
}
