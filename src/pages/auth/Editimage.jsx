import { useContext, useEffect, useState } from "react"
import service from "../../services/config.services.js"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context.jsx"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap/esm";

function Editimage() {

const { authenticateUser, isLoggedIn, loggedUserId, isAdmin, isDarkTheme } = useContext(AuthContext)
const [imageUrl, setImageUrl] = useState(null); 
const [isUploading, setIsUploading] = useState(false);

const handleFileUpload = async (event) => {

  if (!event.target.files[0]) {
    return;
  }
  setIsUploading(true);
  const uploadData = new FormData();
  uploadData.append("image", event.target.files[0]);


  try {
    const response = await service.post("/upload", uploadData)
    setImageUrl(response.data.imageUrl);
    console.log(response.data.imageUrl)
    setIsUploading(false);

      const perfilEditado = {
        imageUrl: response.data.imageUrl
      }  
      await service.patch(`/auth/perfil/${loggedUserId}/foto-perfil`, perfilEditado)

    
  } catch (error) {
    console.log(error)
    //navigate("/error");
  }
};
  return (
    <div>
      
      <label>Image: </label>
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      {/*  
      <Form.Group controlId="imageUrl" className="mb-3">
        <Form.Label>Imagen del perfil
          {isUploading ? <Spinner animation="grow" variant="warning" /> : null}
        </Form.Label>
        <Form.Control
          type="file"
          name="imageUrl"
          value={imageUrl}
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </Form.Group>
      */}

      {/* to render a loading message or spinner while uploading the picture */}
      {isUploading ? <Spinner animation="grow" variant="dark" /> : null}

      {/* below line will render a preview of the image from cloudinary */}
      {imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}
    </div>
  )
}

export default Editimage