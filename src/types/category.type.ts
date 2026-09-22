export interface Category {
    id: number
    userId: number
    name: string
    type: string
    icon?: string
    color?: string
    isDefault: boolean
    createdAt: string
}


export interface CategoryRequest {
    id: number
    name: string
    type: string
    icon?: string
    color?: string
}
