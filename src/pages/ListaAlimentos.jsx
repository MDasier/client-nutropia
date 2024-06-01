import { useEffect, useState } from "react"
import service from "../services/config.services"
import { Spinner } from "react-bootstrap/esm"
import AlimentoCard from "../components/AlimentoCard"
import BuscarAlimento from "../components/BuscarAlimento"

function ListaAlimentos() {
    const [listaAlimentos, setListaAlimentos] = useState(null)

    useEffect(()=>{
        const getAlimentos = async () => {
            const alimentos = await service.get("/alimentos")
            setListaAlimentos(alimentos.data)
        }
        getAlimentos()
    },[])

    if(listaAlimentos===null){
        return <Spinner animation="border" role="status"></Spinner>
        
      }
    
      return (
        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap" style={{
            scrollbarWidth: "none",
            overflowY: "scroll"}}>
            <BuscarAlimento setListaAlimentos={setListaAlimentos} />
            {listaAlimentos
            .map((alimento)=>{
                return <AlimentoCard key={alimento._id} alimento={alimento} />
            })}
        </div>
      )
}

export default ListaAlimentos