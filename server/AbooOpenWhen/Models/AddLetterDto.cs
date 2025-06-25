namespace AbooOpenWhen.Models
{
    public class AddLetterDto
    {
        public required string Content { get; set; }
        public string? Recipient { get; set; }
        public string? Color { get; set; }

        public required bool Sent { get; set; } = false;

        public required string When { get; set; }
    }
}
