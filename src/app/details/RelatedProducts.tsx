import ActivityList from "../_components/cards/ActivityList";
import Heading from "../_components/Heading";

interface RelatedProductProps {
  data: {
    related_products?: Array<any>;
    category?: string;
    location?: [];
  };
}

function RelatedProduct({ data }: RelatedProductProps) {
  if (!data?.related_products?.length) return null;

  return (
    <section className="my-10">
      <Heading
        title="Related Activities"
        description="Journeys Through Heritage and Tradition"
        showButtons={false}
      />
      <ActivityList data={data.related_products} />
    </section>
  );
}

export default RelatedProduct;
