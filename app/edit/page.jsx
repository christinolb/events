import ContactFormEdit from "../components/ContactFormEdit";
import FormSelctButtons from "../components/FormSelctButtons";


export default function Edit() {  
  return (    
    <div className='p-4 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold'>Edit Event Form </h1>

      <ContactFormEdit />
      <FormSelctButtons />
    </div>
  )
}
