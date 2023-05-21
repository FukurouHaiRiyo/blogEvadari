import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.GRAPHQL_API;

export default async function comments(req, res){
      const {name, email, slug, comment} = req.body;
      const graphcmsToken = process.env.GRAPH_CMS_TOKEN;

      const graphqlClient = new GraphQLClient(graphqlAPI, {
            headers:{
                  authorization: `Bearer ${graphcmsToken}`
            }
      });

      const query = gql`
            mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String){
                  createComment(data: {name: $name, email: $email, comment: $comment, post: { connect: {slug: $slug }}}){id}
            }
      `
      
      try{
            const result = await graphqlClient.request(query, req.body);

            return res.status(200).send(result);
      } catch(error){
            console.log(error);
      }
}