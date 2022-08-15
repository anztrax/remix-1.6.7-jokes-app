import React from 'react';
import { useLoaderData } from "@remix-run/react";
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import useRestaurantHooks from "~/routes/useRestaurant.hooks";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import {
  doGetRestaurants,
  GetRestaurantsResponse
} from "~/services/restaurant/restaurantService.server";
import {
  ActionFunction,
  json,
  LoaderFunction
} from "@remix-run/node";
import ItemCard from "~/components/restaurant/Card";

const imageBaseUrl = 'http://localhost:1337';
const getImageUrl = (imageUrl: string) => {
  return `${imageBaseUrl}${imageUrl}`;
}

type LoaderData = GetRestaurantsResponse;

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const result = await doGetRestaurants();
  return json({
    ...result
  });
}

export const action: ActionFunction = async ({ request }) => {
  console.log('action request : ', request);
}

export default function restaurantIndexRoute(){
  const data = useLoaderData<LoaderData>();
  const {
    searchForm,
    onSearch,
    onClickRestaurantDetail
  } = useRestaurantHooks();

  return (
    <div>
      <div>
        <Form
          method={'get'}
          form={searchForm}
          validateTrigger={["onBlur", "onChange"]}
          layout={"vertical"}
          onFinish={onSearch}
        >
          <Form.Item
            name={'name'}
            label={'Name'}
          >
            <Input placeholder={'search restaurant name'} />
          </Form.Item>
          <Button type={'primary'} htmlType={'submit'}>
            Search
          </Button>
        </Form>
      </div>
      <div>
        {data.data.map((item, index) => {
          return (
            <ItemCard
              indexText={`${item.id}`}
              nameText={item.attributes.name}
              descriptionText={item.attributes.description}
              imageUrl={getImageUrl(item.attributes.image.data.attributes.formats.medium.url)}
              altText={item.attributes.image.data.attributes.alternativeText}
            >
              <Button
                type={'primary'}
                onClick={() => onClickRestaurantDetail(`${item.id}`)}
              >
                View
              </Button>
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}
