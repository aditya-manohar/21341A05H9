import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: 'Laptop',
        minPrice: 1,
        maxPrice: 10000,
        topN: 10
    });

    const fetchProducts = async () => {
        const response = await fetch(`http://localhost:5000/top-products?category=${filters.category}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&topN=${filters.topN}`);
        const data = await response.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Top Products
            </Typography>
            <Grid container spacing={2}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography color="textSecondary">{product.company}</Typography>
                                <Typography variant="body2">${product.price}</Typography>
                                <Typography variant="body2">Rating: {product.rating}</Typography>
                                <Typography variant="body2">Discount: {product.discount}%</Typography>
                                <Typography variant="body2">{product.availability ? 'In Stock' : 'Out of Stock'}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductsPage;
