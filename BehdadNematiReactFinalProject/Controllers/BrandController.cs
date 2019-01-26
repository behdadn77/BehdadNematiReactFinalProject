using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BehdadNematiReactFinalProject.Models;
using BehdadNematiReactFinalProject.Models.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BehdadNematiReactFinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : Controller
    {
        DBBehdad db;
        public BrandController(DBBehdad _db)
        {
            db = _db;
        }

        [HttpGet("[action]")]
        public List<BrandViewModel> GetBrands(string Search)
        {
            if (Search!=null)
            {
                return db.Brands.Where(x => x.Name.Contains(Search)).ToList()
                    .Select(x => new BrandViewModel
                    {
                        Id = x.Id,
                        Name = x.Name,
                        img = x.Img == null ? "not found" : $"data:image/jpeg;base64,{Convert.ToBase64String(x.Img)}",
                    }).ToList();
            }
            return db.Brands.ToList().Select(x => new BrandViewModel {
                Id = x.Id,
                Name = x.Name,
                img =x.Img==null ?"not found":$"data:image/jpeg;base64,{Convert.ToBase64String(x.Img)}",
            }).ToList();
        }
        [HttpGet("[action]")]
        public BrandViewModel GetBrandById(int Id)
        {
            var b = db.Brands.Find(Id);
            if (b == null) return null;
            return new BrandViewModel
            {
                Id = b.Id,
                Name = b.Name,
                img = $"data:image/jpeg;base64,{Convert.ToBase64String(b.Img)}"
            };
        }

        [HttpPost("[action]")]
        public IActionResult UpdateBrand([FromForm] BrandViewModel brand, IFormFile file1)
        {
            var b = db.Brands.Find(brand.Id);
            if (b != null)
            {
                b.Name = brand.Name;
                if (file1 != null)
                {
                    byte[] pic = new byte[file1.Length];
                    file1.OpenReadStream().Read(pic, 0, pic.Length);
                    b.Img = pic;
                }
                db.SaveChanges();
            }
            return Redirect("/Brand");
        }

        [HttpGet("[action]")]
        public IActionResult DeleteBrand(int Id)
        {
            var p=db.Brands.Find(Id);
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

        public IActionResult InsertPorduct([FromForm] BrandViewModel p, IFormFile file1)
        {
            Brand brand = new Brand()
            {
                Name = p.Name,
            };
            byte[] b = new byte[file1.Length];
            file1.OpenReadStream().Read(b, 0, b.Length);
            brand.Img = b;
            db.Add(brand);
            db.SaveChanges();
            return Redirect("/Brand");
        }
    }
}