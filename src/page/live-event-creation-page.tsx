import {
    ActionList,
    Button,
    Card,
    Form,
    FormLayout,
    Modal,
    Page,
    Popover,
    ResourceList,
    TextField, TextStyle, Thumbnail
} from "@shopify/polaris";
import {useCallback, useEffect, useState} from "react";
import {LiveStatus} from "../entities/live-event.entity";
import {Product} from "../entities/product.entity";
import {useHistory} from "react-router-dom";
export function LiveEventCreationPage(){

    const history = useHistory();

    const [title, setTitle] = useState<string>('');
    const [status, setStatus] = useState<LiveStatus>(LiveStatus.SCHEDULED);

    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [popoverActive, setPopoverActive] = useState<boolean>(false);
    const [modalActive, setModalActive] = useState<boolean>(false);

    const handleModalChange = useCallback(() => setModalActive(!modalActive), [modalActive]);

    const handleSubmit = useCallback((_event) => {
        alert('이벤트를 생성할 수 있어야 합니다.')
    }, []);
    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );
    const handleTitleChange = useCallback((value) => setTitle(value), []);
    const popOverActivator = (
        <Button onClick={togglePopoverActive} disclosure>
            이벤트 선택하기
        </Button>
    );
    const modalActivator = <Button onClick={handleModalChange}>상품 선택하기</Button>;

    return (
        <Page title={'이벤트 생성 페이지'} breadcrumbs={[{content: 'live event', onAction() {
                history.push('list')
            }}]}>
            <Card title={'이벤트 생성하기'}>
                <Card.Section>
                    <Form onSubmit={handleSubmit}>
                        <FormLayout>
                            <TextField
                                value={title}
                                onChange={handleTitleChange}
                                label="제목"
                                type="text"
                            />
                            <Popover
                                active={popoverActive}
                                activator={popOverActivator}
                                onClose={togglePopoverActive}
                            >
                                <ActionList items={[{content: 'Import'}, {content: 'Export'}]} />
                            </Popover>
                            <Modal
                                activator={modalActivator}
                                open={modalActive}
                                onClose={handleModalChange}
                                title="상품을 선택해주세요."
                                primaryAction={{
                                    content: '상품 추가 완료',
                                    onAction: handleModalChange,
                                }}
                            >
                                <Modal.Section>
                                    <ResourceList
                                        selectedItems={selectedProducts}
                                        onSelectionChange={(selectedItems: string[])=>{setSelectedProducts(selectedItems)}}
                                        selectable
                                        items={products.map((product) => ({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            media: (
                                                <Thumbnail
                                                    source={product.thumbnail}
                                                    alt={product.name}
                                                />
                                            ),

                                        }))}
                                        renderItem={(item) => {
                                            const {id, name, media, price} = item;
                                            return (
                                                <ResourceList.Item
                                                    id={id}
                                                    onClick={()=>{}}
                                                    media={media}
                                                    accessibilityLabel={`View details for ${name}`}
                                                >
                                                    <h3>
                                                        <TextStyle variation="strong">{name}</TextStyle>
                                                    </h3>
                                                    <div>￦{price}</div>
                                                </ResourceList.Item>
                                            );
                                        }}
                                    />
                                </Modal.Section>
                            </Modal>
                            <Button primary submit>이벤트 생성하기</Button>
                        </FormLayout>
                    </Form>
                </Card.Section>
            </Card>
        </Page>
    )
}
