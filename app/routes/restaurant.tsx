import React from 'react';
import { Outlet } from "@remix-run/react";

export default function RestaurantRoute(){
  return (
    <div>
      <Outlet />
    </div>
  );
}
