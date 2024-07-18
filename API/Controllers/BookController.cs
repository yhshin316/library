using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Entities;
using API.Data;
using API;
using API.DTO;
using Microsoft.AspNetCore.Hosting;
using static System.Net.Mime.MediaTypeNames;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController(DataContext context) : ControllerBase
    {
        [HttpPost("AddBook")]
        public async Task<ActionResult<Book>> AddBook(AddBookDto addBookDto)
        {
            var byteArray = Convert.FromBase64String(addBookDto.Cover);

            using (var memoryStream = new MemoryStream(byteArray))
            {
                Book book = new Book
                {
                    Title = addBookDto.Title,
                    Author = addBookDto.Author,
                    Description = addBookDto.Description,
                    Publisher = addBookDto.Publisher,
                    Publication = addBookDto.Publication,
                    Category = addBookDto.Category,
                    ISBN = addBookDto.ISBN,
                    PageCount = addBookDto.PageCount,
                    Cover = memoryStream.ToArray(),
                };
                context.Books.Add(book);
                await context.SaveChangesAsync();
                return Ok(book);
            }
        }

        [HttpGet("Delete/{id}")]
        public async Task<ActionResult<Book>> RemoveBook(int id)
        {
            var book = await context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }
            context.Books.Remove(book);
            await context.SaveChangesAsync();
            return Ok(book);
        }

        [HttpGet("AllBooks")]
        public async Task<ActionResult<IEnumerable<Book>>> GetAllBooks()
        {
            var books = await context.Books.ToListAsync();
            return Ok(books);
        }

        [HttpGet("EditBook/{id}")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBookById(int id)
        {
            var books = await context.Books.FindAsync(id);
            return Ok(books);
        }

        [HttpGet("SomeBooks/{page}")]
        public async Task<ActionResult<IEnumerable<Book>>> GetSomeBooks(int page)
        {
            var books = await context.Books.Skip((page-1)*5).Take(5).ToListAsync();
            return Ok(books);
        }

        [HttpPut("EditBook")]
        public async Task<ActionResult<Book>> BorrowBook(Book book)
        {
            var existingBook = await context.Books.FindAsync(book.Id);
            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.Publisher = book.Publisher;
            existingBook.Category = book.Category;
            existingBook.ISBN = book.ISBN;
            existingBook.PageCount = book.PageCount;
            existingBook.Publication = book.Publication;
            existingBook.Description = book.Description;
            existingBook.Cover = book.Cover;
            await context.SaveChangesAsync();
            return Ok(existingBook);
        }

        [HttpPut("BorrowBook")]
        public async Task<ActionResult<Book>> BorrowBook(CheckOutDto check)
        {
            var borrow = await context.Books.FindAsync(check.id);
            if(borrow == null) { return BadRequest("No book with that ID"); }
            borrow.Username = check.username;
            borrow.returnTime = (DateTime.Now.Date).AddDays(5);
            await context.SaveChangesAsync();

            var books = await context.Books.ToListAsync();

            return Ok(books);
        }

        [HttpPut("Return")]
        public async Task<ActionResult<Book>> ReturnBook(CheckOutDto check)
        {
            var borrow = await context.Books.FindAsync(check.id);
            if (borrow == null) { return BadRequest("No book with that ID"); }
            borrow.Username = null;
            borrow.returnTime = null;
            await context.SaveChangesAsync();

            var books = await context.Books.ToListAsync();

            return Ok(books);
        }

        [HttpGet("GetRandomBooks")]
        public async Task<ActionResult<IEnumerable<Book>>> GetRandomBooks(int count)
        {
            var randomBooks = await context.Books
                                        .FromSqlRaw("SELECT * FROM Books ORDER BY RANDOM() LIMIT 5;")
                                        .ToListAsync();

            if (randomBooks == null || !randomBooks.Any())
            {
                return NotFound();
            }

            return Ok(randomBooks);
        }

        [HttpGet("titleSearch/{search}")]
        public async Task<ActionResult<IEnumerable<Book>>> titleSearch(string search)
        {
            var searchedBooks = await context.Books.Where(book=> book.Title.Contains(search)).ToListAsync();

            return Ok(searchedBooks);
        }

    }
}
