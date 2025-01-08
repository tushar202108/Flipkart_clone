import Navbar from "./Navbar";
import Banner from "./Banner";
import { Box, styled } from "@mui/material";
import { useEffect } from "react";
import { getProducts } from "../../redux/actions/productAction";
import { useDispatch } from "react-redux";


const Componenet = styled(Box)`
padding:10px;
background:#F2F2F2;
`;



const Home = () =>{

    const dispatch  = useDispatch();

    useEffect( () => {
        dispatch(getProducts())

    }, [dispatch])

    return(
        <>
            <Navbar/>
            <Componenet>
                <Banner/>
            </Componenet>
        </>
        
    )
}

export default Home;
