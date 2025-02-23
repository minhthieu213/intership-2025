import { Button as ButtonUI } from "@/components/ui/button"

export default function ButtonDemo({title, ...className}) {
  return <ButtonUI {...className}>{title}</ButtonUI>
}
