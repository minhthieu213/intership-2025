import React from 'react'
import { Input } from "@/components/ui/input"

const InputAddCard = React.forwardRef(({ className, value, onChange, onKeyPress }, ref) => {
  return (
    <Input 
      ref={inputRef} 
      placeholder="Input"
      className={className} 
      value={value} 
      onChange={onChange} 
      onKeyPress={onKeyPress}
    />
  )
})

export default InputAddCard