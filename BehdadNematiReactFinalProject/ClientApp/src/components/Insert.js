import React, { Component } from 'react';
import { Brand } from './Brand/Brand';

export class Insert extends Component {
    constructor() {
        super();
        //this.Insert = this.Insert.bind(this);
        this.onChooseImage = this.onChooseImage.bind(this);
        this.state = { brands: [] };
        fetch(`/api/Brand/GetBrands`).then(x => x.json()).then(x => this.setState({ brands: x }));
    }
    onChooseImage = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.refs.file1.files[0]);
        reader.onloadend = e => {
            this.refs.imgpreview.src = e.target.result;
        };
    };
    //Insert() {
    //    var name = this.refs.txtname.value;  
    //    var price = parseInt(this.refs.txtprice.value);
    //    var count = parseInt(this.refs.txtcount.value);
    //    fetch(`/api/Product/InsertPorduct?name=${name}&price=${price}&count=${count}`,
    //        { method: 'post' }).then(x => x.json()).then(x => {
    //            if (x.result) {
    //                this.refs.txtname.value = "";
    //                this.refs.txtprice.value = "";
    //                this.refs.txtcount.value = "";
    //                alert('Product Inserted.');
    //            }
    //        });
    //}
  render () {
    return (
      <div>
            <form className="container offset-md-2 col-md-8" style={{ border: '2px solid cyan' }}
                action="/api/Product/InsertPorduct"
                method="post" enctype="multipart/form-data">
                <h1>Insert Product</h1> 
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" type="text"/>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input className="form-control" type="number" name="price" type="text"/>
                </div>
                <div className="form-group">
                    <label>Count</label>
                    <input className="form-control" type="number" name="count"  />
                </div>
                <div className="form-group">
                    <label>Brand</label>
                    <select className="form-control" type="number" name="brand_id" ref="BrandCombo">
                        {
                            this.state.brands.map((x, index) =>
                                <option value={x.id} selected="selected">{x.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Product Image</label>
                    <input className="form-control" 
                        type="file" ref="file1" name="file1"
                        onChange={() => this.onChooseImage()} />
                    <img ref="imgpreview" width="100" style={{ 'margin-top': '20px' }} />
                </div>
                <button className="btn btn-success" >Add</button>
            </form>
      </div>
    );
  }
}
