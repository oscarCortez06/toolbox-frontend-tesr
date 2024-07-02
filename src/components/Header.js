import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function Header(){
    return(
        <>
					<Navbar bg="danger" variant="danger">
						<Nav className="mr-auto">
							<Nav.Link href="#home" style={{ color: '#ffffff', fontWeight: 'bold'}}>Toolbox Test</Nav.Link>
						</Nav>
					</Navbar>
        </>
    )
}
