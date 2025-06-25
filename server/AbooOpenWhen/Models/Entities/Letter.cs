namespace AbooOpenWhen.Models.Entities
{
    public class Letter
    {
        public Guid Id { get; set; }

        public required string Content { get; set; }
        public required string Sender { get; set; }
        public string? Recipient { get; set; }
        public string? Color { get; set; }
        public required string When { get; set; }
        public required bool Sent { get; set; } = false;

    }
}
