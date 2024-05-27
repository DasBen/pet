import React from 'react'
import SearchBar from './SearchBar'
import HashtagList from './HashtagList'
import {Hashtag} from '../interfaces/Hashtag'

interface RightSidebarProps {
  trendingHashtags: Hashtag[]
}

const RightSidebar: React.FC<RightSidebarProps> = ({trendingHashtags}) => {
  return (
    <>
      <SearchBar />
      <HashtagList title="Trending Hashtags" hashtags={trendingHashtags} className="mt-3" />
    </>
  )
}

export default RightSidebar
