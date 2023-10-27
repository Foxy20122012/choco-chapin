'use client'

import { useStore } from '@/hooks/useStore'
import environment from '@/utils/environment'
import presets from '@/utils/globalPresets'
import { EyeSlashIcon, EyeIcon, KeyIcon } from '@heroicons/react/20/solid'
import { UserIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
  password: string
}

const RegisterForm = () => {
  const [passwordShown, setPasswordShown] = React.useState(false)
  const [, setEnv] = useStore(s => s.env, a => a.setEnv)

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  })

  async function hashPassword (password) {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hash = await window.crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
  }

  const onSubmit = async (data: FormData) => {
    data.password = await hashPassword(data.password)
    // interface IEnv {
    //   token?: string
    //   user?: any
    //   constante?: any
    //   redirectPath?: string
    // }
    const env = {
      token: '',
      user: {
        id: 1,
        nombre: 'Admin',
        apellido: 'Admin',
        email: data.email
      }
    }
    await environment.setEnvUser(env)
    setEnv(env)
  }

  return (
    <>
      <div className={'flex flex-wrap w-screen h-screen bg-gray-200'}>
        <div className={'flex flex-shrink w-full h-full  md:w-1/2 lg:w-1/3 bg-white'}>
          {/* <!-- Tarjeta de Login --> */}
          <div className={'rounded-lg w-full border-[#E9ECEF] border'}>
            <div className={'flex w-full p-4 justify-center overflow-hidden'}>
              <div className={'h-64 w-64 flex justify-center items-center shrink-0'}>
                <Image
                  src={presets.images.logo}
                  alt="logo"
                  className={'w-52 h-52 border rounded-xl bg-slate-400 bg-center bg-auto bg-no-repeat object-contain'}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="align-center flex w-full px-8 py-4">
              <div className={'flex w-full flex-col space-y-4'}>
                {/* <!-- Formulario --> */}
                <div className="flex w-full flex-col space-y-4">
                  <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 select-none">
                        Usuario
                          <div className='inline-flex text-sm font-medium text-red-400'> (*)</div>
                        </label>
                        <div className='relative flex h-9 justify-between'>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            {...register('email', { required: true })}
                            className="w-full p-2 border-y border-l focus:border-gray-400 outline-none rounded-l-lg focus:border-r-none"
                            placeholder="example@email.com"
                          />
                          <div className='bg-theme-app-500 hover:bg-theme-app-600 text-white flex justify-center items-center p-2 rounded-r-lg cursor-pointer'>
                            <UserIcon className='h-5 w-5' />
                          </div>
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">El campo Usuario es requerido.</p>}
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 select-none">
                        Clave
                          <div className='inline-flex text-sm font-medium text-red-400'> (*)</div>
                        </label>
                        <div className='relative flex h-9 justify-between'>
                          <input
                            type={passwordShown ? 'text' : 'password'}
                            id="password"
                            name="password"
                            {...register('password', { required: true })}
                            className="w-full p-2 border-y border-l focus:border-gray-400 outline-none rounded-l-lg focus:border-r-none"
                          />
                          <div
                            className='bg-theme-app-500 hover:bg-theme-app-600 text-white flex justify-center items-center p-2 rounded-r-lg cursor-pointer'
                            onClick={() => { setPasswordShown(!passwordShown) }}
                          >
                            {!passwordShown ? <EyeSlashIcon className='h-5 w-5' /> : <EyeIcon className='h-5 w-5' />}
                          </div>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">El campo Clave es requerido.</p>}
                      </div>
                      <div className="mb-4">
                        <button
                          type="submit"
                          className={`inline-flex w-full justify-center items-center h-9 px-2 m-1 text-white ease-linear transition-colors duration-150 rounded-md border ${isValid ? 'bg-red-500 hover:bg-red-600' : 'bg-red-300 cursor-not-allowed'}`}
                          disabled={!isValid}>
                          <KeyIcon className="h-5 w-5 pr-2" />
                          Iniciar Sesión
                        </button>
                      </div>
                    </form>
                  </>
                </div>
                {/* <!-- Fin Formulario --> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className={'hidden flex-shrink h-full  md:w-1/2 lg:w-2/3 md:flex bg-center bg-contain'}
          style={{ backgroundImage: `url(${presets.images.loginFondo})`, minHeight: '75vh', backgroundSize: 'cover' }}
        />
      </div>
    </>
  )
}

export default RegisterForm
