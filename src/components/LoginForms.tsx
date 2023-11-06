import React from 'react';

const LoginForm = () => {
  return (
    <div className="h-screen flex">
      {/* Parte izquierda para la imagen */}
      <div className="hidden md:block w-1/2 bg-cover" style={{ backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtiVK0EMXYFvKZ2BtPUOcDcefUm1-DDaL91DXSwhAHD2IfV4ebd3Ceq3Ijn3rMjvYi60I&usqp=CAU' }}></div>

      {/* Parte derecha para el formulario */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6">
        <div className="max-w-md w-full p-6 border rounded shadow-lg bg-white">
          <h2 className="text-3xl font-semibold mb-6 text-center">Inicio de Sesión</h2>
          <form>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
              <input type="email" id="email" name="email" className="mt-2 p-3 w-full border rounded" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
              <input type="password" id="password" name="password" className="mt-2 p-3 w-full border rounded" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

