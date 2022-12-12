import { toast } from "react-toastify"
import { GitCommandResponse } from "../data/interfaces/git.interface"

export const ToastWrapper = {
    git: (response: GitCommandResponse) => {
        if (response.success) {
            toast.success(response.message)
        } else {
            toast.warning(response.message)
        }
    }
}