import { useEffect, useState } from "react"
import service from "../services/config.services"
import { Spinner } from "react-bootstrap/esm"
import AlimentoCard from "../components/AlimentoCard"
import BuscarAlimento from "../components/BuscarAlimento"
import BuscarCategoria from "../components/BuscarCategoria"

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
        <div className="d-flex-c m-2 gap-2 justify-content-center align-items-center">
            <BuscarAlimento setListaAlimentos={setListaAlimentos} />
            <BuscarCategoria setListaAlimentos={setListaAlimentos} />
        
            <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap" style={{
                scrollbarWidth: "none",
                overflowY: "scroll"}}>
                {listaAlimentos
                .map((alimento)=>{
                    return <AlimentoCard key={alimento._id} alimento={alimento} />
                })}
            </div>
        </div>
      )
}

export default ListaAlimentos