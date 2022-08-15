import React from 'react';
import { json, LoaderFunction } from "@remix-run/node";
import { doGetRestaurant, GetRestaurantResponse } from "~/services/restaurant/restaurantService.server";
import { useLoaderData } from "@remix-run/react";
import ItemCard from "~/components/restaurant/Card";
import Button from "antd/lib/button";

const imageBaseUrl = 'http://localhost:1337';
const getImageUrl = (imageUrl: string) => {
  return `${imageBaseUrl}${imageUrl}`;
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  if(!params.restaurantId){
    throw new Response(
      `restaurant Id must be filled`,
      { status : 400 }
    );
  }

  const result = await doGetRestaurant(params.restaurantId);
  return json({
    ...result
  });
}

type LoaderData = GetRestaurantResponse;

export default function RestaurantDetailRoute(){
  const data = useLoaderData<LoaderData>();
  console.log('data : ', data);

  return (
    <div>
      {data.data.attributes.dishes.data.map((item, index) => {
        console.log('item  :',item);
        console.log('image item : ', item.attributes.image.data);
        return (
          <ItemCard
            indexText={`${item.id}`}
            nameText={item.attributes.name}
            descriptionText={item.attributes.description}
            imageUrl={getImageUrl(item.attributes.image.data.attributes.url)}
            altText={item.attributes.image.data.attributes.alternativeText}
          />
        );
      })}
    </div>
  );
}

