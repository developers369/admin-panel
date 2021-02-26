import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  marginLeft: 20,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: '100%',
  height: '100%'
};


function Previews(props) {
  const [filePreview, setFilePreview] = useState("");
  

  // const [popupClass, setPopupClass] = useState("modal")
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      

      acceptedFiles.map(file => console.log(file))
      acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      console.log(acceptedFiles[0].preview);
      setFilePreview(acceptedFiles[0].preview)
      props.passFile(acceptedFiles[0].preview)    

    }
  });
  
  const thumbs = 
    <div style={thumb}>
      <div style={thumbInner}>
        <img
          src={props.cropImage}
          style={img}
          alt="Preview"
        />
      </div>
    </div>

  

  // useEffect(() => () => {
  //   // Make sure to revoke the data uris to avoid memory leaks
    
  //   URL.revokeObjectURL(filePreview);
  // }, [filePreview]);

  return (

    <section className="container" style={{border: "1px dashed", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <div {...getRootProps({className: 'dropzone'})} style={{width: "120%", textAlign: "center"}}>
        <input {...getInputProps()} />
        <p className="dropText">Drop File Heres to Upload</p>
      </div>
    
      { props.cropImage !== null && <aside style={thumbsContainer}>
        {thumbs}
      </aside>}
      
    </section>


  );
}

export default Previews;