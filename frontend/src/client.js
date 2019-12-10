
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const link = createUploadLink({ uri: "http://localhost:4444" });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;