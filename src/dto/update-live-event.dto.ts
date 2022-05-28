import { LiveStatus } from "../entities/live-event.entity"

export interface UpdateLiveEventDto {
  title?: string
  status?: LiveStatus
  productIds?: string[]
}
