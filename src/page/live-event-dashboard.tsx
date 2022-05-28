import {
  AppProvider,
  Heading,
  Layout,
  Page,
  ResourceList,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris"
import { useEffect, useState, useCallback } from "react"
import { ScheduledEventCard } from "../component/scheduled-event-card"
import {
  EventCardProps,
  FinishedEventCardProps,
  LiveEventCardProps,
  ScheduledEventCardProps,
} from "../interface/event-card.props"
import { LiveEvent, LiveStatus } from "../entities/live-event.entity"
import { LiveEventCard } from "../component/live-event-card"
import { FinishedEventCard } from "../component/finished-event-card"
import { useHistory } from "react-router-dom"
import { Product } from "../entities/product.entity"
import {
  deleteLiveEvent,
  getLiveEvents,
  getProductsOfEvent,
  patchLiveEvent,
} from "../client/api"
import { LiveEventsResponse } from "../response/live-event.response"

export function LiveEventDashboard() {
  const history = useHistory()
  const [scheduledEventCardProps, setScheduledEventCardProps] = useState<
    ScheduledEventCardProps[]
  >([])
  const [liveEventCardProps, setLiveEventCardProps] = useState<
    LiveEventCardProps[]
  >([])
  const [finishedEventCardProps, setFinishedEventCardProps] = useState<
    FinishedEventCardProps[]
  >([])

  const fetchLiveEvent = useCallback(async (): Promise<LiveEventsResponse> => {
    return await getLiveEvents()
  }, [])

  const fetchProductsOfEvents = useCallback(async (res: LiveEventsResponse) => {
    const liveEvents: LiveEvent[] = res.liveEvents
    const nextCardProps: EventCardProps[] = []

    // 각 이벤트들이 가지고 있는 product 항목들을 가져와서 nextCardProps 변수 배열에 넣음
    await Promise.all(
      liveEvents.map(async (event) => {
        const { products } = await getProductsOfEvent(event.id)
        nextCardProps.push({
          event,
          products,
          onDeleteAction: async () => {
            await deleteLiveEvent(event.id)
            await fetchList()
          },
        })
      })
    )

    const scheduled: ScheduledEventCardProps[] = []
    const live: LiveEventCardProps[] = []
    const finished: FinishedEventCardProps[] = []

    nextCardProps.forEach((props) => {
      if (props.event.status === LiveStatus.SCHEDULED) {
        scheduled.push({
          ...props,
          onLiveEventAction: async () => {
            await patchLiveEvent(props.event.id, { status: LiveStatus.LIVE })
            await fetchList()
          },
        })
      } else if (props.event.status === LiveStatus.LIVE) {
        live.push({
          ...props,
          onFinishedEventAction: async () => {
            await patchLiveEvent(props.event.id, {
              status: LiveStatus.FINISHED,
            })
            await fetchList()
          },
        })
      } else {
        finished.push({
          ...props,
        })
      }
    })
    setScheduledEventCardProps(scheduled)
    setLiveEventCardProps(live)
    setFinishedEventCardProps(finished)
  }, [])

  const fetchList = useCallback(async () => {
    fetchLiveEvent().then(async (res) => await fetchProductsOfEvents(res))
  }, [])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  return (
    <Page
      title={"이벤트 대시보드"}
      fullWidth
      secondaryActions={[
        {
          content: "라이브 쇼핑 페이지로 이동",
          onAction: () => {
            window.location.href = "/live-shopping-page"
          },
        },
      ]}
      primaryAction={{
        content: "새 이벤트 생성하기",
        onAction: () => {
          history.push("create-live-event")
        },
      }}
    >
      <Layout>
        <Layout.Section oneThird>
          <Heading>방송 대기중인 이벤트</Heading>
          {scheduledEventCardProps.map((props) => {
            return (
              <ScheduledEventCard
                key={props.event.id}
                event={props.event}
                products={props.products}
                onDeleteAction={props.onDeleteAction}
                onLiveEventAction={props.onLiveEventAction}
              />
            )
          })}
        </Layout.Section>
        <Layout.Section oneThird>
          <Heading>방송 중인 이벤트</Heading>
          {liveEventCardProps.map((props) => {
            return (
              <LiveEventCard
                key={props.event.id}
                event={props.event}
                products={props.products}
                onDeleteAction={props.onDeleteAction}
                onFinishedEventAction={props.onFinishedEventAction}
              />
            )
          })}
        </Layout.Section>
        <Layout.Section oneThird>
          <Heading>방송 종료된 이벤트</Heading>
          {finishedEventCardProps.map((props) => {
            return (
              <FinishedEventCard
                key={props.event.id}
                event={props.event}
                products={props.products}
                onDeleteAction={props.onDeleteAction}
              />
            )
          })}
        </Layout.Section>
      </Layout>
    </Page>
  )
}
