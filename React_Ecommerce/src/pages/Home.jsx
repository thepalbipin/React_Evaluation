import { SimpleGrid, Select, Container, Flex } from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  async function fetchProducts(sortOrder, filterCategory) {
    setLoading(true);
    try {
      let queryParams = {};
      if (filterCategory) {
        queryParams.category = filterCategory;
      }
      if (sortOrder) {
        queryParams._sort = "price";
        queryParams._order = sortOrder;
      }

      let response = await axios({
        method: "get",
        url: `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products`,
        params: queryParams,
      });

      let data = response?.data;
      setLoading(false);
      setProducts(data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchProducts(sortOrder, filterCategory);
  }, [sortOrder, filterCategory]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;

  return (
    <Container maxW="container.xl">
      <Flex marginY={6}>
        <Select
          placeholder="Sort by Price"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>
        <Select
          placeholder="Filter by Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="homedecor">HomeDecor</option>
        </Select>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
