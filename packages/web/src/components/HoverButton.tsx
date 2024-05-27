import React, {useState} from 'react'
import {Button, ButtonProps} from 'react-bootstrap'
import {ButtonVariant} from 'react-bootstrap/esm/types'

interface HoverButtonProps extends ButtonProps {
  initialVariant?: ButtonVariant
  hoverVariant?: ButtonVariant
}

const HoverButton: React.FC<HoverButtonProps> = ({
  variant = 'outline-link',
  hoverVariant = 'outline-success',
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <Button
      {...props}
      variant={isHovered ? `${hoverVariant}` : variant}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Button>
  )
}

export default HoverButton
