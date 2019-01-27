import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

export class Brand extends Component {
  
    constructor(props) {
        super(props);
        this.GetBrandLst = this.GetBrandLst.bind(this);
        this.Delete = this.Delete.bind(this);
        this.state = { brands: [] };
        fetch(`/api/Brand/GetBrands`).then(x => x.json()).then(x => this.setState({ brands: x }));
    }
    //componentDidMount() {
    //    this.GetBrandLst();
    //}
    GetBrandLst(s) { 
        fetch(`/api/Brand/GetBrands?Search=${s}`).then(x => x.json()).then(x => this.setState({ brands: x }));
    }
    Delete(id) {
        
        fetch(`/api/Brand/DeleteBrand?id=${id}`,
            { method: 'get' }).then(x => x.json()).then(x => {
                if (x.result) {
                    this.GetBrandLst(null);
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
                    ref="txtGetBrandLst"
                />
                <button className="btn btn-info" onClick={() => this.GetBrandLst(this.refs.txtGetBrandLst.value)}>Search</button>
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.brands.map((x, index) =>
                            <tr>
                                <td>{x.id}</td>
                                <td>{x.name}</td>                               
                                <td>
                                    <img src={x.img} height="40" width="40"/>
                                </td>
                                <td>
                                    <Link to={`/UpdateBrand/${x.id}`}>                                        
                                        <button className="btn btn-warning" style={{'margin-right':'20px'}}>Edit</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={()=>this.Delete(x.id)}>Delete</button>
                                </td>
                                
                            </tr>
                        )
                    }
                </tbody>
            </table >
            <Link to={`/InsertBrand`}>
                <button className="btn btn-success" style={{ 'margin-right': '20px' }}>+ Add More</button>
            </Link>
      </div>
    );
  }
}
