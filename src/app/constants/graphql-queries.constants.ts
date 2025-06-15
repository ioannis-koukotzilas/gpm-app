import { gql } from 'apollo-angular';

export const GET_SERVICES = gql`
  query getServices {
    services {
      nodes {
        slug
        title
        content
        featuredImage {
          node {
            srcSet
            altText
          }
        }
      }
    }
  }
`;

export const GET_SERVICE_BY_SLUG = gql`
  query getServiceBySlug($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      slug
      title
      content
      featuredImage {
        node {
          srcSet
          altText
        }
      }
    }
  }
`;
