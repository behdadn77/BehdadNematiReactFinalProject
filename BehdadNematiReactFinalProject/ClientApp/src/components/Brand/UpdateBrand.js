import React, { Component } from 'react';

export class UpdateBrand extends Component {
    constructor(props) {
        super(props);
        this.state = { productId: this.props.match.params.productId };
        fetch(`/api/product/GetProductById?Id=${this.state.productId}`)
            .then(x => x.json()).then(x => {
                document.getElementById('name').value = x.name;
                document.getElementById('price').value = x.price;
                document.getElementById('count').value = x.count;
                document.getElementById('imgpreview').src = x.img;
                document.getElementById('Id').value = x.id;
            });
    }
    onChooseImage = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.refs.file1.files[0]);
        reader.onloadend = e => {
            this.refs.imgpreview.src = e.target.result;
        };
    };
  
  render () {
    return (
      <div>
            <form className="container offset-md-2 col-md-8" style={{ border: '2px solid cyan' }}
                action="/api/Product/UpdateProduct"
                method="post" enctype="multipart/form-data">
                <h1>Update Product</h1>
                <input hidden="hidden" name="Id" id="Id" />
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" type="text" id="name"/>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input className="form-control" type="text" name="price" type="text" id="price"/>
                </div>
                <div className="form-group">
                    <label>Count</label>
                    <input className="form-control" type="text" name="count" id="count"/>
                </div>
                <div className="form-group">
                    <label>Product Image</label>
                    <input className="form-control" placeholder="type product image"
                        type="file" ref="file1" name="file1"
                        onChange={() => this.onChooseImage()} />
                    <img ref="imgpreview" id="imgpreview" width="100" style={{ 'margin-top': '20px' }} />
                </div>
                <button className="btn btn-warning">Update</button>
            </form>
      </div>
    );
  }
}
