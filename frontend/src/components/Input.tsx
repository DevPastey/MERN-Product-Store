
type InputProps = {
    placeholder: string,
    value: string,
     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string;
    name: string;
}



const Input: React.FC<InputProps> = ({placeholder, value, type, onChange, name}) => {
    
  return (
    <>
    <input className="border text-sm rounded w-full px-2 py-1 border-gray-200" type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} />
    </>
  )
}

export default Input
