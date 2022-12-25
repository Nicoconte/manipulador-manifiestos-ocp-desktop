import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { GlobalContext, GlobalContextType } from "../../context/GlobalContext";

type SideModalProps = {
    children: JSX.Element | React.ReactNode
}

export const SideModal = ({ children }: SideModalProps) => {
    const { openSideModal, setOpenSideModal } = useContext(GlobalContext) as GlobalContextType;

    return (
        <div className={`${openSideModal ? "block" : "hidden"}`}>
            <div className={`w-full flex flex-row-reverse bg-slate-500 bg-opacity-60 overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none`}>
                <div className="w-5/12 bg-slate-100">
                    {children}
                </div>
                <div className="w-1/12 h-full flex justify-end items-start">
                    <button onClick={() => setOpenSideModal(false)} className="h-9 w-9 flex justify-center items-center bg-slate-800 rounded-l-lg">
                        <XMarkIcon className="h-6 text-slate-50 transition ease-linear hover:text-red-600" />
                    </button>
                </div>
            </div>
        </div>
    )
}