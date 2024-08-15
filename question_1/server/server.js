const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(cors());
const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
app.get('/top-products', async (req, res) => {
    const { category, minPrice, maxPrice, topN } = req.query;
    const results = [];

    const authorizationHeader = {
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzNzA2ODI3LCJpYXQiOjE3MjM3MDY1MjcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjJmYzRiYmMyLTU3YmQtNDNhMi04Y2RhLTEwYjFjMmNmZDA5NSIsInN1YiI6ImFkaXR5YW1hbm9oYXIyMDAwNEBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJBZmZvcmRtZWQiLCJjbGllbnRJRCI6IjJmYzRiYmMyLTU3YmQtNDNhMi04Y2RhLTEwYjFjMmNmZDA5NSIsImNsaWVudFNlY3JldCI6IkNYQVpnSWhaWnpOdnFkUlYiLCJvd25lck5hbWUiOiJBZGl0eWEgTWFub2hhciIsIm93bmVyRW1haWwiOiJhZGl0eWFtYW5vaGFyMjAwMDRAZ21haWwuY29tIiwicm9sbE5vIjoiMjEzNDFhMDVoOSJ9.ETG7y7yc-cOdN6JPbcc4rbnigU82KBCmTRuTiTjPXbk',
        },
    };

    for (const company of companies) {
        try {
            const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products`, {
                params: {
                    top: topN,
                    minPrice,
                    maxPrice,
                },
                ...authorizationHeader,
            });
            results.push(...response.data.products);
        } catch (error) {
            console.error(`Failed to fetch products from ${company}`, error.response ? error.response.data : error.message);
        }
    }

    const sortedResults = results.sort((a, b) => a.price - b.price).slice(0, topN);

    res.json(sortedResults);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
