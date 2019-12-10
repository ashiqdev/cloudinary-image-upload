import gql from 'graphql-tag';



export const GET_SCREENS_QUERY = gql `
  query GET_SCREENS_QUERY {
    getScreens {
      original
      w200
    }
  }
`;