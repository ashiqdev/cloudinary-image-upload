import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPLOAD_FILE_MUTATION } from "../resolvers/mutation";
import { GET_SCREENS_QUERY } from "../resolvers/query";
import Dropzone from "react-dropzone";

const Upload = () => {
  const [uploadFile, { error }] = useMutation(UPLOAD_FILE_MUTATION, {
    refetchQueries: [{query: GET_SCREENS_QUERY}]
  });

  const createScreen = async files => {
    files.map(async file => {
      await uploadFile({ variables: { file } });
    });
  };

  return (
    <div>
      <Dropzone onDrop={files => createScreen(files)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default Upload;
