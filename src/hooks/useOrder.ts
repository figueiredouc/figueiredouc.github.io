/* eslint-disable no-console */
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import api from 'api';
import { CreateOrderParams } from 'types';

type Hook = () => {
  createOrder: (params: CreateOrderParams) => Promise<void>;
  isSuccess: boolean;
};

const useOrder: Hook = () => {
  const history = useHistory();

  const [createOrder, { isSuccess }] = useMutation(api.createOrder, {
    onSuccess: (data) => {
      history.push(`/order/${data.purchaseId}`);
    },
    onError: (error) => {
      console.log('onError: ', error);
    },
  });

  return { createOrder, isSuccess };
};

export default useOrder;
