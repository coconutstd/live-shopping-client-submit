import {LiveEvent} from "../entities/live-event.entity";
import {Product} from "../entities/product.entity";

export interface EventCardProps {
    event: LiveEvent,
    products: Product[],
    onDeleteAction: (id: string) => any
}
export interface ScheduledEventCardProps extends EventCardProps {
    onLiveEventAction: (id: string) => any
}
export interface LiveEventCardProps extends EventCardProps {
    onFinishedEventAction: (id: string) => any
}
export interface FinishedEventCardProps extends EventCardProps {

}
