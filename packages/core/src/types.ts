export type AlertType = 'success' | 'info' | 'warning' | 'danger'
export type Alert = {
    id: string
    message: string
    type: AlertType
}