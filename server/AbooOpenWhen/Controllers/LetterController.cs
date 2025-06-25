using AbooOpenWhen.Data;
using AbooOpenWhen.Migrations;
using AbooOpenWhen.Models;
using AbooOpenWhen.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace AbooOpenWhen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LetterController : ControllerBase
    {
        private readonly AuthDbContext dbContext;

        public LetterController(AuthDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetLetters()
        {
            var user = HttpContext.User!;
            if (user.Identity is null)
            {
                return BadRequest("User not found");
            }

            string email = user.Identity.Name;
            if (email is null)
            {
                return BadRequest("User not found");
            }
            var sender = dbContext.Letters.Where<Letter>(x => x.Sender == email);

            var recipient = dbContext.Letters.Where<Letter>(x => x.Recipient == email && x.Sent);

            return Ok(new {sender=sender,recipient=recipient });
        }

        [HttpGet]
        [Authorize]
        [Route("{id:guid}")]
        public IActionResult GetLetter(Guid id)
        {
            var user = HttpContext.User!;
            Console.WriteLine("Test");
            if (user.Identity is null)
            {
                return BadRequest("User not found");
            }

            string email = user.Identity.Name;
            if (email is null)
            {
                return BadRequest("User not found");
            }



            var letters = dbContext.Letters.Where<Letter>(x => (x.Recipient.Equals(email) || x.Sender.Equals(email)) && x.Id == id);

            return Ok(letters);
        }

        [HttpPost]
        [Authorize]
        public IActionResult CreateLetter(AddLetterDto addLetter)
        {
            var user = HttpContext.User!;
            if (user.Identity is null)
            {
                return BadRequest("User not found");
            }

            string email = user.Identity.Name;
            if (email is null)
            {
                return BadRequest("User not found");
            }

            if(addLetter.Recipient is not null)
            {
                IdentityUser sentUser;
                try
                {
                    sentUser = dbContext.Users.First(x => x.Email.Equals(addLetter.Recipient));
                } catch(InvalidOperationException e)
                {
                    return BadRequest("Recipient not found");
                }
                if (sentUser is null)
                {
                    return BadRequest("Recipient not found");
                }
            }

            Letter letter = new Letter()
            {
                Content = addLetter.Content,
                Sent = addLetter.Sent,
                Color = addLetter.Color,
                Sender = email,
                Recipient = addLetter.Recipient,
                When = addLetter.When
            }; 
            dbContext.Letters.Add(letter);
            dbContext.SaveChanges();
            return Ok(letter);
        }

        [HttpPut]
        [Authorize]
        [Route("{id:guid}")]
        public IActionResult UpdateLetter(UpdateLetterDto updateLetter, Guid id)
        {
            var user = HttpContext.User!;
            if (user.Identity is null)
            {
                return BadRequest("User not found");
            }

            string email = user.Identity.Name;
            if (email is null)
            {
                return BadRequest("User not found");
            }

            var letter = dbContext.Letters.Find(id);
            if(letter is null || !letter.Sender.Equals(email))
            {
                return NotFound();
            }

            if(updateLetter.Sent is not null)
            {
                letter.Sent = (bool)updateLetter.Sent;
            }

            if(updateLetter.Content is not null)
            {
                letter.Content = updateLetter.Content;
            }

            if(updateLetter.Recipient is not null)
            {
                letter.Recipient = updateLetter.Recipient;
            }

            if(updateLetter.Color is not null)
            {
                letter.Color = updateLetter.Color;
            }

            if (updateLetter.When is not null)
            {
                letter.When = updateLetter.When;
            }

            dbContext.SaveChanges();
            return Ok(letter);
        }

        [HttpDelete]
        [Authorize]
        [Route("{id:guid}")]
        public IActionResult DeleteUser(Guid id)
        {
            var user = HttpContext.User!;
            if (user.Identity is null)
            {
                return BadRequest("User not found");
            }

            string email = user.Identity.Name;
            if (email is null)
            {
                return BadRequest("User not found");
            }

            var letter = dbContext.Letters.Find(id);
            if (letter is null || !letter.Sender.Equals(email))
            {
                return NotFound();
            }
            
            dbContext.Letters.Remove(letter);
            dbContext.SaveChanges();
            return Ok();
        }
    }
}
