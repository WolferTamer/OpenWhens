namespace AbooOpenWhen.Models
{
    public class UpdateLetterDto
    {
        public string? Content { get; set; }
        public string? Recipient { get; set; }
        public string? Color { get; set; }
        public string? When { get; set; }
        public bool? Sent { get; set; }
    }
}
