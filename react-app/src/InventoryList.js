import React, {Component} from 'react';
import AppNavBar from './Navbar';
import {Link} from 'react-router-dom';
import { Button, Container, ButtonGroup, Table } from 'reactstrap';


export default class InventoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {inventories: [], isLoading: true};
    }
    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/api/inventories')
            .then(response => response.json())
            .then(data => this.setState({inventories: data, isLoading: false}));
    }

    removeInv = async (id) => {
        await fetch(`/api/inventory/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            console.log(`Deleted inventory with id: ${id}`);
            let updatedInventories = [...this.state.inventories].filter(i => i._id !== id);
            this.setState({inventories: updatedInventories});
        });
    }

    render() {
        const {inventories, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        const inventoryList = inventories.map(inventory => {
            return <tr key={inventory._id}>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.prodname}</td>
                <td>{inventory.qty}</td>
                <td>{inventory.price}</td>
                <td>{inventory.status}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/inventory/" + inventory._id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.removeInv(inventory._id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
        return (
            <div>
                <AppNavBar />
                <Container fluid>
                    <div className="float-end">
                        <Button color="success" 
                        tag={Link} 
                        to="/inventory/new"
                        >Add Inventory
                        </Button>
                    </div>
                    <h3>Inventory List</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Product Name</th>
                            <th width="20%">Quantity</th>
                            <th width="20%">Price</th>
                            <th width="20%">Status</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inventoryList}
                        </tbody>
                    </Table>
                 </Container>
            </div>
        );
    }
}