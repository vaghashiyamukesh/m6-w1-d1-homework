import React, {Component} from 'react';
import AppNavBar from './Navbar';
import {Link} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavBar from './Navbar';

class InventoryEdit extends Component {
    emptyInventory = {
        prodname: '',
        qty: '',
        price: '',
        status: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyInventory
        };
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const inventory = await (await fetch(`/api/inventory/${this.props.match.params.id}`)).json();
            this.setState({item: inventory});
        }
    } 
    
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/inventory' + (item._id ? '/' + item._id : ''), {
            method: (item._id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/inventory');
    }
    
    render() {
        const {item} = this.state;
        const title = <h2>{item._id ? 'Edit Inventory' : 'Add Inventory'}</h2>; 
        return (
            <div>
                <AppNavBar />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="prodname">Product Name</Label>
                            <Input type="text" name="prodname" id="prodname" value={item.prodname || ''} onChange={this.handleChange} autoComplete="prodname"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="qty">Quantity</Label>
                            <Input type="text" name="qty" id="qty" value={item.qty || ''} onChange={this.handleChange} autoComplete="qty"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input type="text" name="price" id="price" value={item.price || ''} onChange={this.handleChange} autoComplete="price"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="status">Status</Label>
                            <Input type="text" name="status" id="status" value={item.status || ''} onChange={this.handleChange} autoComplete="status"/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/inventory">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}
export default InventoryEdit;
