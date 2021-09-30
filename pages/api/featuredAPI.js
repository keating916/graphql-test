import { GraphQLClient, gql } from 'graphql-request'
async function featuredAPI(_req, res) {
    const endpoint = "https://api-us-west-2.graphcms.com/v2/cktls2x2m1dyd01z08hrwa5nt/master"

    const API_KEY = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzIzNzA3NjEsImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuZ3JhcGhjbXMuY29tL3YyL2NrdGxzMngybTFkeWQwMXowOGhyd2E1bnQvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYmU5ZGUwYjgtNDMzMS00N2ZiLTk3MWUtYWFkMTUyNTAyYTA4IiwianRpIjoiY2t0d2Zla2s4MHFlZzAxejA5bjBhaDh1NiJ9.gCWsQd2wOEsq5N8oFKZ_1uQBtpn90mvnOGkNQRFaq5F8TgyPQczYJS5YONT4rfpAtiHzAk61-avc3TCXuC5n8a_ioiIykEvPUMyEed3yIZ4eUbJDsqnx7SlxZjxP9YwNgbFsQ8eyuXZbIZl4hvvC61nX_fIzwHazzRCiCB9lLLkmP1JUqTwWZAsCVd0hzrL3QERuTnpxEemzZS-2CWOC3Np-g8pmvVqbMAb01fw5UQJYGTMdzoBT74-nnmU1HhBgR7PZh8zta7ewOppbhRO-odD0cnvszPmWGKiEP81dGFF1QcC3vnw34Lv9FT_jXUMhK7Ytl7Rhvq7mn87z6uozcmrQMAGRdIFQQVdc5GvLsXIsuOczCqAX0UwIJ2mwEN0RQypdjOmfInbPRykGdNRoSChoxv-v7-QVmhCvd3mLRIPrzR59IXsJPlQwrIxE6dIsBHUISewQU1CMW5oVj-zlf-Iai5jYaMuPGn6a92vLpH3eUENqp9OUERR5qi0ppTVFyDsKlQvpP9PP3UCPGHtHpSX9zj6jO0s1SssRbVMjH14nLJbZTGaA449PktvG6iGAZZpY4k2GHAeKxVIn_ax4IV5JaKwiiCGdiiW9eW5ygjmYUAXE1qdhP6z9LFC5t-eeKg0W0eByJpIUafJzjJNUn8sKoV6KPtQ7EHpedEg7ndY'

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          authorization: `Bearer ${API_KEY}`,
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
    res.send(products) //sends products marked as featured to client side
}

export default featuredAPI;