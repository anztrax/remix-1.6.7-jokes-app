import React from 'react';
import Button from "antd/lib/button";
import DatePicker from "antd/lib/date-picker";
import { Outlet } from "@remix-run/react";

const AntdIndexRoute = () => {
  return (
    <div>
      <h1 className={'text-3xl'}>Antd</h1>
      <p className={'text-9xl mb-0'}>text 9xl</p>
      <p className={'text-rose-300'}>testing gan</p>
      <Button type={'primary'}>Submit</Button>
      <DatePicker />
    </div>
  );
}

export default AntdIndexRoute;
