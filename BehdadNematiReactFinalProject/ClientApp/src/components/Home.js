import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;
    constructor(props) {
        super(props);
        this.GetProductLst = this.GetProductLst.bind(this);
        this.Delete = this.Delete.bind(this);
        this.state = { products: [] };
        fetch(`/api/Product/GetProducts`).then(x => x.json()).then(x => this.setState({ products: x }));
    }
    //componentDidMount() {
    //    this.GetProductLst();
    //}
    GetProductLst(s) { 
        fetch(`/api/Product/GetProducts?Search=${s}`).then(x => x.json()).then(x => this.setState({ products: x }));
    }
    Delete(id) {
        
        fetch(`/api/Product/DeleteProducts?id=${id}`,
            { method: 'get' }).then(x => x.json()).then(x => {
                if (x.result) {
                    this.GetProductLst(null);
                    alert("Deleted");
                }
            });
    }
  render () {
    return (
      <div className="container offset-md-2 col-md-8">
            <h1>ProductList</h1>
            <div>
                <input className="form-control"
                    placeholder="Search"
                    ref="txtGetProductLst"
                />
                <button className="btn btn-info" onClick={() => this.GetProductLst(this.refs.txtGetProductLst.value)}>Search</button>
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Count</th>
                        <th>Brand</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.products.map((x, index) =>
                            <tr>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.price}</td>
                                <td>{x.count}</td>
                                <td>{x.brand.name}</td>
                                <td>
                                    <img src={x.img} height="40" width="40"/>
                                </td>
                                <td>
                                    <Link to={`/Update/${x.id}`}>                                        
                                        <button className="btn btn-warning" style={{'margin-right':'20px'}}>Edit</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={()=>this.Delete(x.id)}>Delete</button>
                                </td>
                                
                            </tr>
                        )
                    }
                </tbody>
            </table >
            <Link to={`/Insert`}>
                <button className="btn btn-success" style={{ 'margin-right': '20px' }}>+ Add More</button>
            </Link>
      </div>
    );
  }
}
