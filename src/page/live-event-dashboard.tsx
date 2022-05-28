import {AppProvider, Heading, Layout, Page, ResourceList, TextStyle, Thumbnail} from "@shopify/polaris";
import {useEffect, useState} from "react";
import {ScheduledEventCard} from "../component/scheduled-event-card";
import {FinishedEventCardProps, LiveEventCardProps, ScheduledEventCardProps} from "../interface/event-card.props";
import {LiveStatus} from "../entities/live-event.entity";
import {LiveEventCard} from "../component/live-event-card";
import {FinishedEventCard} from "../component/finished-event-card";
import {useHistory} from "react-router-dom";
import {Product} from "../entities/product.entity";

export function LiveEventDashboard() {
    const history = useHistory();

    const sampleScheduledEventCardProps: ScheduledEventCardProps = {
        event: {
            id: '1',
            title: '스카프 20% 할인 예정',
            status: LiveStatus.SCHEDULED,
            productIds: ['1', '2']
        },
        products: [
            {
                id: '1',
                name: 'Black & orange scarf',
                thumbnail: 'https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg',
                price: 10000
            },
            {
                id: '2',
                name: 'Tucan scarf',
                thumbnail: 'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg',
                price: 20000
            }
        ],
        onDeleteAction: () => {
            alert('이벤트가 삭제되어야 합니다.')
        },
        onLiveEventAction: () => {
            alert('방송 중인 이벤트로 이동되어야 합니다.')
        }
    }
    const sampleLiveEventCardProps: LiveEventCardProps = {
        event: {
            id: '2',
            title: '스카프 20% 할인 - 진행중',
            status: LiveStatus.LIVE,
            productIds: ['1', '2']
        },
        products: [
            {
                id: '1',
                name: 'Black & orange scarf',
                thumbnail: 'https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg',
                price: 10000
            },
            {
                id: '2',
                name: 'Tucan scarf',
                thumbnail: 'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg',
                price: 20000
            }
        ],
        onDeleteAction: () => {
            alert('이벤트가 삭제되어야 합니다.')
        },
        onFinishedEventAction: () => {
            alert('방송 종료된 이벤트로 이동되어야 합니다.')
        },
    }
    const sampleFinishedEventCardProps: FinishedEventCardProps = {
        event: {
            id: '3',
            title: '스카프 20% 할인 - 진행중',
            status: LiveStatus.FINISHED,
            productIds: ['1', '2']
        },
        products: [
            {
                id: '1',
                name: 'Black & orange scarf',
                thumbnail: 'https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg',
                price: 10000
            },
            {
                id: '2',
                name: 'Tucan scarf',
                thumbnail: 'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg',
                price: 20000
            }
        ],
        onDeleteAction: () => {
            alert('이벤트가 삭제되어야 합니다.')
        },
    }

    return (
        <Page title={'이벤트 대시보드'} fullWidth secondaryActions={[{
            content: '라이브 쇼핑 페이지로 이동', onAction: () => {
                window.location.href = '/live-shopping-page'
            }
        }]} primaryAction={{
            content: '새 이벤트 생성하기', onAction: () => {
                history.push('create-live-event')
            }
        }}>
            <Layout>
                <Layout.Section oneThird>
                    <Heading>방송 대기중인 이벤트</Heading>
                    <ScheduledEventCard event={sampleScheduledEventCardProps.event}
                                        products={sampleScheduledEventCardProps.products}
                                        onDeleteAction={sampleScheduledEventCardProps.onDeleteAction}
                                        onLiveEventAction={sampleScheduledEventCardProps.onLiveEventAction}
                    />
                </Layout.Section>
                <Layout.Section oneThird>
                    <Heading>방송 중인 이벤트</Heading>
                    <LiveEventCard event={sampleLiveEventCardProps.event}
                                   products={sampleLiveEventCardProps.products}
                                   onDeleteAction={sampleLiveEventCardProps.onDeleteAction}
                                   onFinishedEventAction={sampleLiveEventCardProps.onFinishedEventAction}
                    />
                </Layout.Section>
                <Layout.Section oneThird>
                    <Heading>방송 종료된 이벤트</Heading>
                    <FinishedEventCard event={sampleFinishedEventCardProps.event}
                                       products={sampleFinishedEventCardProps.products}
                                       onDeleteAction={sampleFinishedEventCardProps.onDeleteAction}
                    />
                </Layout.Section>
            </Layout>
        </Page>
    )
}
