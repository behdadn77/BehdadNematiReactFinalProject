using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BehdadNematiReactFinalProject.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
        public byte[] Img { get; set; }
        public int Brand_Id { get; set; }
        [ForeignKey("Brand_Id")]
        public Brand Brand { get; set; }
    }
}
