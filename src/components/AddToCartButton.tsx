'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/payload-types';

interface AddToCartButtonProps {}

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);
  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      className="w-full"
      size="lg"
    >
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  );
};

export default AddToCartButton;
