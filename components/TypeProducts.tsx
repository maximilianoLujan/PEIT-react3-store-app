import { useEffect, useState } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import ProductCard from "./ProductCard";
import ImageCard from "./ImageCard";
import category from "../src/constants/category";
import { ProductType } from "../src/types/products";
import { categoriesApi } from "../src/services/categoriesApi";

interface TypeProductsProps {
  index: number;
}

const TypeProducts: React.FC<TypeProductsProps> = ({ index }) => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getCategoy = async () => {
    setLoading(true);
    const response = await categoriesApi.getCategoryById(index);
    setProducts(response.products);
    setLoading(false);
  };

  useEffect(() => {
    getCategoy();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "1rem",
        width: "100%",
        maxWidth: "1398px",
      }}
    >
      <ImageCard
        name={category.find((item) => item.id === index)?.name || ""}
        img={category.find((item) => item.id === index)?.img || ""}
        url={category.find((item) => item.id === index)?.url || ""}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" width="100%">
          <CircularProgress />
        </Box>
      ) : (
        products &&
        products
          .slice(0, 5)
          .map((product) => (
            <ProductCard key={`product-${product.id}`} product={product} />
          ))
      )}
    </Container>
  );
};

export default TypeProducts;
