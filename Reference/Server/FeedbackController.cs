using System;
using System.Net;
using System.Net.Mail;
using System.Web.Mvc;

namespace Reference.Server
{
    public class FeedbackController : Controller
    {
        public ActionResult Send(string url, string email, string content)
        {
            var message = new MailMessage();

            message.To.Add(new MailAddress("tribejs@gmail.com", "Tribe"));
            message.From = new MailAddress("tribejs@gmail.com", "Tribe Feedback");
            message.Subject = "tribejs.com Feedback";
            message.Body = string.Format("URL: {0}\nEmail: {1}\n\n{2}", url, email, content);

            var client = new SmtpClient(Configuration.Value["SmtpHost"], Convert.ToInt32(Configuration.Value["SmtpPort"]));
            client.Credentials = new NetworkCredential(Configuration.Value["SmtpUsername"], Configuration.Value["SmtpPassword"]);
            client.Send(message);

            return new EmptyResult();
        }
    }
}
