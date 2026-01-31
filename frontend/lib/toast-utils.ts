import { toast } from "sonner"

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
}

export const showSuccessToast = (options: ToastOptions) => {
  const { title = "Success", description = "Operation completed successfully", duration = 3000 } = options

  toast.success(title, {
    description,
    duration,
  })
}

export const showErrorToast = (options: ToastOptions) => {
  const { title = "Error", description = "Something went wrong", duration = 4000 } = options

  toast.error(title, {
    description,
    duration,
  })
}

export const showInfoToast = (options: ToastOptions) => {
  const { title = "Info", description = "Here is some information", duration = 3000 } = options

  toast.info(title, {
    description,
    duration,
  })
}

export const showWarningToast = (options: ToastOptions) => {
  const { title = "Warning", description = "Please be careful", duration = 3000 } = options

  toast.warning(title, {
    description,
    duration,
  })
}
