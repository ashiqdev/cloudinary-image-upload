import gql from "graphql-tag";

export const UPLOAD_FILE_MUTATION = gql`
  mutation UPLOAD_FILE_MUTATION($file: Upload!) {
    uploadFile(file: $file) {
      original
      w200
    }
  }
`;
