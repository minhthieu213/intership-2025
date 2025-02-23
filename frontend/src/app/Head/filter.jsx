import { Input } from "@/components/ui/input"

export default function InputDemo({...className}) {

  return <Input
  {...className}
  type="text" placeholder="Filter by keyword or by field" />
}
