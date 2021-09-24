import { GraphQLClient, gql } from 'graphql-request'
async function featuredAPI(req, res) {
    console.log("Key: ", process.env.API_KEY)
    const endpoint = "https://api-us-west-2.graphcms.com/v2/cktls2x2m1dyd01z08hrwa5nt/master"

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          authorization: `Bearer ${process.env.API_KEY}`,
        },
    })

    const query = gql`
            
            {
                sawblades(where:{featured: true}) {
                    name
                    productNumber
                    images {
                        url
                    }
                    description
                    price
                }
            }
            
        `
    const products = await graphQLClient.request(query)
    res.send(products)
}

export default featuredAPI;