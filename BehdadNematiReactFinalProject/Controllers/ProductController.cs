using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BehdadNematiReactFinalProject.Models;
using BehdadNematiReactFinalProject.Models.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BehdadNematiReactFinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        DBBehdad db;
        public ProductController(DBBehdad _db)
        {
            db = _db;
        }

        [HttpGet("[action]")]
        public List<ProductViewModel> GetProducts(string Search)
        {
            if (Search!=null)
            {
                return db.products.Where(x => x.Name.Contains(Search))
                    .Include(x => x.Brand).ToList()
                    .Select(x => new ProductViewModel
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Price = x.Price,
                        img = x.Img == null ? "not found" : $"data:image/jpeg;base64,{Convert.ToBase64String(x.Img)}",
                        Count = x.Count,
                        Brand = x.Brand
                    }).ToList();
            }
            return db.products.Include(x => x.Brand).ToList()
                .Select(x => new ProductViewModel {
                    Id = x.Id,
                    Name = x.Name,
                    Price = x.Price,
                    img = x.Img == null ? "not found" : $"data:image/jpeg;base64,{Convert.ToBase64String(x.Img)}",
                    Count = x.Count,
                    Brand = x.Brand
            }).ToList();
        }
        [HttpGet("[action]")]
        public ProductViewModel GetProductById(int Id)
        {
            var p = db.products.Find(Id);
            if (p == null) return null;
            return new ProductViewModel
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Count = p.Count,
                brand_id=p.Brand_Id,
                img = $"data:image/jpeg;base64,{Convert.ToBase64String(p.Img)}"
            };
        }

        [HttpPost("[action]")]
        public IActionResult UpdateProduct([FromForm] ProductViewModel pp, IFormFile file1)
        {
            var p = db.products.Find(pp.Id);
            if (p != null)
            {
                p.Name = pp.Name;
                p.Price = pp.Price;
                p.Count = pp.Count;
                p.Brand_Id = pp.brand_id;
                if (file1 != null)
                {
                    byte[] b = new byte[file1.Length];
                    file1.OpenReadStream().Read(b, 0, b.Length);
                    p.Img = b;
                }
                db.SaveChanges();
            }
            return Redirect("/");
        }

        [HttpGet("[action]")]
        public IActionResult DeleteProducts(int Id)
        {
            var p=db.products.Find(Id);
            if (p!=null)
            {
                db.Remove(p);
                if (db.SaveChanges()!=0)
                {
                    return Json(new { result = true }); 
                }
            }
            return Json(new { result = false });
        }

        [HttpPost("[action]")]

        public IActionResult InsertPorduct([FromForm] ProductViewModel p, IFormFile file1)
        {
            Product product = new Product()
            {
                Name = p.Name,
                Price = p.Price,
                Count = p.Count,
                Brand_Id=p.brand_id
                
            };
            byte[] b = new byte[file1.Length];
            file1.OpenReadStream().Read(b, 0, b.Length);
            product.Img = b;
            db.Add(product);
            db.SaveChanges();
            return Redirect("/");
        }
    }
}