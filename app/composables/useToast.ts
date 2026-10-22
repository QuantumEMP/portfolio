export interface Toast {
  id: number
  title: string
  description?: string
  icon?: string
  color?: 'success' | 'error'
  /** ms before it closes itself; defaults to 5s */
  duration?: number
}

let nextId = 0
const timers = new Map<number, ReturnType<typeof setTimeout>>()

/** A tiny toast queue, shown by <SiteToast> in app.vue */
export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [])

  const remove = (id: number) => {
    clearTimeout(timers.get(id))
    timers.delete(id)
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const add = (toast: Omit<Toast, 'id'>) => {
    const id = ++nextId
    toasts.value = [...toasts.value, { ...toast, id }]
    timers.set(id, setTimeout(() => remove(id), toast.duration ?? 5000))
  }

  return { toasts, add, remove }
}
