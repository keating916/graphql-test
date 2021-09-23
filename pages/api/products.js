import { GraphQLClient, gql } from 'graphql-request'
export default async (req, res) => {
    console.log(process.env.API_KEY)
    endpoint = "https://api-us-west-2.graphcms.com/v2/cktls2x2m1dyd01z08hrwa5nt/master"

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          authorization: `Bearer ${process.env.API_KEY}`,
        },
    })

    const query = gql`
            {
                sawblades {
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
    res.send(products.json())
}
