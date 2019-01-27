import React, { Component } from 'react';

export class InsertBrand extends Component {
    constructor() {
        super();
        this.onChooseImage = this.onChooseImage.bind(this);
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
                action="/api/Brand/InsertBrand"
                method="post" enctype="multipart/form-data">
                <h1>Insert Brand</h1> 
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" type="text"/>
                </div>
                
                <div className="form-group">
                    <label>Brand Image</label>
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
