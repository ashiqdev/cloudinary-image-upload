import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SCREENS_QUERY } from "../resolvers/query";
import SingleImage from "./SingleImage";

const Images = () => {
  const { loading, error, data } = useQuery(GET_SCREENS_QUERY);
  if (loading) return <p>loading.....</p>;
  return (
    <div>
      {data.getScreens.map(image => (
        <SingleImage image={image} key={image.id} />
      ))}
    </div>
  );
};

export default Images;
