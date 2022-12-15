import React from "react"

import { XMarkIcon } from '@heroicons/react/24/outline'

type ModalProps = {
  open: boolean,
  setOpen: (value: boolean) => void,
  buttonText: string
  buttonClassname: string,
  icon: JSX.Element | HTMLButtonElement | React.ReactNode,
  children: JSX.Element | React.ReactNode
}

export const Modal = ({ 
  open, 
  setOpen, 
  buttonText, 
  icon, 
  buttonClassname,
  children
}: ModalProps) => {
  return (
    <div>
      <button
        className={buttonClassname}
        type="button"
        onClick={() => setOpen(true)}
      >
        {icon} {buttonText}
      </button>
      {open ? (
        <>
          <div
            className="justify-center items-center flex bg-slate-500 bg-opacity-80 overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none"
          >
            <div className="relative w-8/12 my-6 mx-auto max-w-3xl rounded">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-100 dark:bg-cyan-800 outline-none focus:outline-none">
                <button
                  className="w-8 absolute top-0 right-0 mt-3 border-0 mr-3 z-40 text-black dark:text-white text-xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  <XMarkIcon className="text-red-300 hover:text-red-900 transition ease-linear" />
                </button>
                {children}
              </div>
            </div>            
          </div>
          <div className="opacity-25 fixed inset-0 z-30 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}