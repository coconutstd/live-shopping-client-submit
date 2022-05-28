export enum LiveStatus {
  LIVE = 'live',
  SCHEDULED = 'scheduled',
  FINISHED = 'finished',
}

export interface LiveEvent {
  id: string,
  title: string,
  status: LiveStatus,
  productIds: string[],
}
