import axios from "axios";
import qs from 'qs';
const baseURL = `http://localhost:1337`;

type CMSMetaResponse = {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number
    }
  }
}

export type CMSOuterResponse<T> = {
  data: {
    id: number,
    attributes: T
  }
} & CMSMetaResponse;

export type CMSArrayOuterResponse<T> = {
  data: Array<{
    id: number,
    attributes: T
  }>
} & CMSMetaResponse;

export type ImageCMSFormatResponse = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

export type ImageCMSResponse = CMSOuterResponse<{
  name: string,
  alternativeText: string,
  caption: string,
  width: number,
  height: number,
  formats: {
    large: ImageCMSFormatResponse,
    small: ImageCMSFormatResponse,
    medium: ImageCMSFormatResponse,
    thumbnail: ImageCMSFormatResponse,
  },
  hash: string,
  ext: string,
  mime: string,
  size: number,
  url: string,
  previewUrl: string | null,
  provider: string,
  provider_metadata: string | null,
  createdAt: string,
  updatedAt: string
}>

export type DishesCMSResponse = CMSArrayOuterResponse<{
  name: string,
  description: string,
  price: number,
  createdAt: string,
  updatedAt: string,
  image: ImageCMSResponse,
  publishedAt: string
}>

export type GetRestaurantsResponse = CMSArrayOuterResponse<({
  name: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  image: ImageCMSResponse
})>;

export type GetRestaurantResponse = CMSOuterResponse<{
  name: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  image: ImageCMSResponse,
  dishes: DishesCMSResponse
}>;

export async function doGetRestaurants(){
  /**
   * localhost:1337/v1/restaurants?fields[0]=name&fields[1]=description&populate[image][fields][1]=url&populate[image][fields][2]=name
   */

  const query = qs.stringify({
    fields: ['name', 'description'],
    populate: ['image']
  },{
    encodeValuesOnly: true,
  });

  const restaurantUrl = `${baseURL}/v1/restaurants?${query}`;
  const response = await axios.get<GetRestaurantsResponse>(restaurantUrl);
  return response.data;
}

export async function doGetRestaurant(id: string){
  const query = qs.stringify({
    populate: {
      'image' : {},
      'dishes': {
        populate: 'image'
      }
    }
  },{
    encodeValuesOnly: true,
  });

  const restaurantDetailUrl = `${baseURL}/v1/restaurants/${id}?${query}`;
  const response = await axios.get<GetRestaurantResponse>(restaurantDetailUrl);
  console.log('response.data : ', response.data);

  return response.data;
}
