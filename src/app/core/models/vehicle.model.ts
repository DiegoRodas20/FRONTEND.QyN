export interface Vehicle {
    id: number,
    plate: string,
    typeVehicle: string,
    status: boolean
}

export interface RegisterVehicle extends Vehicle {
    typeVehicleId: number,
    driverId: number,
    brand: string,
    color: string
}

export interface VehicleByID extends Vehicle {
    idTypeVehicle: number,
    idDriver: number,
    brand: string,
    color: string,
}

export interface UpdateVehicle extends Vehicle {
    typeVehicleId: number,
    driverId: number,
    brand: string,
    color: string
}

export interface TypeVehicle {
    id: number,
    name: string
}