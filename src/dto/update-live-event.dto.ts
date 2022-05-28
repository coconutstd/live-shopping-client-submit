import { LiveStatus } from '../entities/live-event.entity';

export interface CreateLiveEventDto {
    title?: string;
    status?: LiveStatus;
    productIds?: string[];
}
