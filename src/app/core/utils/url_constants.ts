import { environment } from "src/environments/environment"

export const AUTH_URL               = `${environment.API_URL}login`
export const USER_URL               = `${environment.API_URL}user`
    
export const CLIENT_URL             = `${environment.API_URL}client`
export const PRODUCT_URL            = `${environment.API_URL}product`
export const ORDER_URL              = `${environment.API_URL}order`
export const ORDERVEHICLE_URL       = `${environment.API_URL}orderVehicle`
export const VEHICLE_URL            = `${environment.API_URL}vehicle`
export const DRIVER_URL             = `${environment.API_URL}driver`
export const PURCHASE_ORDER_URL     = `${environment.API_URL}purchaseorder`
    
export const CATEGORY_URL           = `${environment.API_URL}category`
export const TYPEDOCUMENT_URL       = `${environment.API_URL}typedocument`
export const CATALOGO_URL           = `${environment.API_URL}product/catalog`
export const PEDIDO_URL             = `${environment.API_URL}order`
export const TYPEVEHICLE_URL        = `${environment.API_URL}typevehicle`
export const SUPPLIER_URL           = `${environment.API_URL}supplier`
export const ROLES_URL              = `${environment.API_URL}rol`
export const DASHBOARD_URL          = `${environment.API_URL}dashboard`

export const MAPBOX_URL             = `${environment.API_MAPBOX}geocoding/v5/`
export const DIRECTIONS_URL         = `${environment.API_MAPBOX}directions/v5/mapbox/driving/`
