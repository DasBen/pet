import React from 'react'
import SearchBar from './searchBar'
import HashtagList from './hashtagList'
import {Hashtag} from '../../../core/src/interfaces/hashtag'

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
