export interface Client {
    id: number,
    name: string,
    numberDocument: string,
    phone: string
}

export interface ClientByID extends Client {
    typeDocumentId: number,
    area: string,
    email: string,
    address: string
}

export interface UpdateClient extends Client {
    typeDocumentId: number,
    area: string,
    email: string,
    address: string
}