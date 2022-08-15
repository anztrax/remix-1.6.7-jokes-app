import React from 'react';
import Card from "antd/lib/card";
import type {
  CardProps
} from "antd/lib/card";

type Props = {
  indexText: string;
  nameText: string;
  descriptionText: string;
  imageUrl: string;
  altText: string;
} & CardProps;

const ItemCard:React.FC<React.PropsWithChildren<Props>> = (props) => {
  const {
    indexText,
    nameText,
    descriptionText,
    imageUrl,
    altText,
    children
  } = props;

  return (
    <Card key={`item-${indexText}`}>
      <div>
        <div className={'font-bold'}>
          Index : {indexText}
        </div>
        <div className={'text-green-900 font-bold'}>
          {nameText}
        </div>
        <div className={'italic'}>
          {descriptionText}
        </div>
        <img
          src={imageUrl}
          alt={altText}
        />
        {children}
      </div>
    </Card>
  );
}

export default ItemCard;
