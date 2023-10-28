'use client'

import React, { useEffect, useState } from 'react'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import AllContexts from '@/context/AllContext'
import BtnAppBar from '@/components/appBar'
import environment from '@/utils/environment'
import useHasMounted from '@/hooks/useHasMounted'
import { useRouter } from 'next/navigation'
import { useStore } from '@/hooks/useStore'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  const hasMounted = useHasMounted()
  const router = useRouter()
  const [userObj, setUserObj] = useState()
  const [_env, setEnv] = useStore(s => s.env, a => a.setEnv)

  const doLogout = async () => {
    const redirectPath = await environment.logout()
    setUserObj(null)
    localStorage.clear()
    router.push(redirectPath as string)
  }

  const getEnv = async () => {
    try {
      const env = await environment.getEnvUser()
      if (!env) {
        await doLogout()
      } else {
        setUserObj(env)
        setEnv(env)
        router.push('/')
      }
    } catch (error) {
      await doLogout()
    }
  }

  useEffect(() => {
    if (hasMounted) {
      (async () => {
        await getEnv()
      })().catch((error) => {
        console.log(error)
      })
    }
  }, [hasMounted, _env])

  return (
    <html lang="en">
      <body className={inter.className}>
        { userObj &&
        <div className="flex md:my-12 md:ml-4 light">
          <AllContexts>
            <BtnAppBar />
            {children}
          </AllContexts>
        </div>
        }
        { !userObj &&
        <div className='overflow-x-hidden'>
          {children}
        </div>
        }
      </body>
    </html>
  )
}
