import React from "react";
import { getConsumerViewOrdersList } from "../data_manager/dataManage";

export const getOrderList = (extentedId, status,searchText='') => {
  return new Promise((resolve, reject) => {
    let postParams = {
      extentedId,
      status,
    };

    getConsumerViewOrdersList(
      postParams,
      null,
      (successResponse) => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          resolve(tempOrderList);  // Resolve the promise with the order list
        } else {
          resolve([]);  // Resolve with an empty array if no orders found
        }
      },
      (errorResponse) => {
        reject([]);  // Reject the promise with the error
      }
    );
  });
};
