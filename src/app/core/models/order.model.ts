import { Client } from "./client.model"
import { Product } from "./product.model"

export interface Order {
    id: number,
    clientName: string,
    clientEmail: string,
    orderStatusId: number,
    orderStatus: string,
    address: string,
    estimatedDate: string,
    comments: string,
    createdAt: string,
    updatedAt: string
}

export interface OrderStatus {
    id: number,
    name: string
}

export interface OrderByID {
    id: number,
    orderStatusId: number,
    estimatedDate: string,
    address: number,
    comments: number,
    client: Client,
    orderDetails: Product[]
}

export interface UpdateOrder {
    id: number,
    comments: string,
    statusId: number,
    estimatedDate: string,
    address: string
}