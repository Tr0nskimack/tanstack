import React from 'react'
import { SimpleTable } from './components/SimpleTable';



const App = () => {
  return (
    <div className=' min-h-screen flex justify-center '>
      
      <div className='flex flex-col mt-20'>
        <header className=''>
          <h1 className='text-4xl'>Listado de Usuarios</h1>
        </header>


        {/* contenido */}
        <div className='mt-5'>
          <SimpleTable/>

        </div>
      </div>
    </div>
  )
}

export default App