import {
  LiveEventsResponse,
  LiveEventCreateResponse,
} from "../response/live-event.response"
import { ProductsResponse, ProductResponse } from "../response/product.response"
import { UpdateLiveEventDto } from "../dto/update-live-event.dto"
import { HttpClient } from "./http-client"
import { CreateLiveEventDto } from "../dto/create-live-event.dto"

const client: HttpClient = HttpClient.getClient()

export const getLiveEvents = async (): Promise<LiveEventsResponse> => {
  return await client.request("/live-event")
}

export const getProductsOfEvent = async (
  eventId: string
): Promise<ProductsResponse> => {
  return await client.request(`/live-event/${eventId}/products`)
}

export const postLiveEvent = async ({
  title,
  status,
  productIds,
}: CreateLiveEventDto): Promise<LiveEventCreateResponse> => {
  return await client.request("/live-event", {
    method: "POST",
    body: JSON.stringify({
      title,
      status,
      productIds,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const patchLiveEvent = async (
  eventId: string,
  { title, status, productIds }: UpdateLiveEventDto
): Promise<void> => {
  await client.request(`/live-event/${eventId}`, {
    method: "PATCH",
    body: JSON.stringify({
      title,
      status,
      productIds,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const deleteLiveEvent = async (eventId: string): Promise<void> => {
  return await client.request(`/live-event/${eventId}`, {
    method: "DELETE",
  })
}

export const getProducts = async (): Promise<ProductsResponse> => {
  return await client.request("/product")
}

export const getProduct = async (
  productId: string
): Promise<ProductResponse> => {
  return await client.request(`/product/${productId}`)
}
