import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ProductListSkeleton } from "../_components/ProductListLoader";

const ProductList = dynamic(() => import('./product'), {
  ssr: false,
  loading: () => <ProductListSkeleton />
});

interface ProductListingProps {
  serverData: any;
}

export default function ProductListing({ serverData }: ProductListingProps) {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList initialData={serverData} />
    </Suspense>
  );
}