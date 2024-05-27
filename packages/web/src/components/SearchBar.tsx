import React from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import HoverButton from './HoverButton'

interface SearchBarProps {
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({className}) => {
  return (
    <InputGroup className={className}>
      <HoverButton
        variant="outline-secondary"
        hoverVariant="outline-success"
        type="submit"
        title="Search videos by title or description"
      >
        <FontAwesomeIcon icon={faSearch} />
      </HoverButton>
      <Form.Control aria-label="Search" name="search" placeholder="Search" />
    </InputGroup>
  )
}

export default SearchBar
