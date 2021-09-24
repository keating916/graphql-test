import { GraphQLClient, gql } from 'graphql-request'
export default async (req, res) => {
    
    const endpoint = "https://api-us-west-2.graphcms.com/v2/cktls2x2m1dyd01z08hrwa5nt/master"

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          authorization: `Bearer ${process.env.API_KEY}`,
        },
    })
    const productNumber = req.query.product
    const query = gql`
        {
            sawblades(where: {productNumber: "${productNumber}"}) {
                name
                productNumber
                images {
                    url
                }
                description
                price
                category
            }
        }
    `
    const products = await graphQLClient.request(query)
    res.send(products)
}
