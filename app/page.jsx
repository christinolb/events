import FormTypeButtons from "./components/FormSelctButtons"
import ContactFormAdd from "./components/ContactFormAdd"

export default function Home() {
  return (
    <div className='p-4 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold'>Add Event Form </h1>
      <p>Please fill in the form below</p>
      <ContactFormAdd />
      <FormTypeButtons />
    </div>
  )
}
