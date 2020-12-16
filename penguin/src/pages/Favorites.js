import Navbar from '../components/Navbar'
import { Table, Container, Row } from "react-bootstrap";
import FavoriteTable from '../components/FavoriteTable'

const Favorites = (props) => {
    console.log(props)
    let obj = props?.location?.state;
    return (
        <div>
            <FavoriteTable id={props?.user?.id} props_obj={obj} />
        </div>
    )
}

export default Favorites
