import { useContext, useEffect, useState } from "react"
import service from "../../services/config.services.js"
import { AuthContext } from "../../context/auth.context.jsx"
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap/esm";

function Editimage() {
const { authenticateUser, reloadInfo, isLoggedIn, loggedUserId, isAdmin, isDarkTheme } = useContext(AuthContext)
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
    //console.log(response.data.imageUrl)
    setIsUploading(false);

    const perfilEditado = {
      imageUrl: response.data.imageUrl
    }  
    await service.patch(`/perfil/${loggedUserId}/foto-perfil`, perfilEditado)
    authenticateUser()
    reloadInfo()
    
  } catch (error) {
    navigate("/server-error");
  }
};
  return (
    <div>
      <Form.Group controlId="imageUrl" className="mb-3" data-bs-theme={isDarkTheme}>
        <Form.Label>Selecciona una imagen: 
        </Form.Label>
        <Form.Control
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </Form.Group>
      {/* to render a loading message or spinner while uploading the picture */}
      {isUploading ? <Spinner animation="grow" variant="success" /> : null}

      {/* below line will render a preview of the image from cloudinary */}
      {imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}
    </div>
  )
}

export default Editimage