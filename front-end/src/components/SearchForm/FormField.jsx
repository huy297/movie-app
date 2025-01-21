import { Controller } from "react-hook-form"

const FormField = ({control, label, name, Component}) => {
  return (
    <div>
      <p className="font-bold mb-1"> {label} </p>
      <Controller 
        name = {name}
        control = {control}
        render = {({field: {onChange, value, name}}) => {
          return <Component onChange={onChange} value={value} name={name} control={control}/>
        }}
      />
    </div>
  )
}

export default FormField
