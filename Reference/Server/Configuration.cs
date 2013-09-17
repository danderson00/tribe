using System.Collections.Generic;

namespace Reference.Server
{
    public class Configuration
    {
        private static Dictionary<string, string> _values;

        public static Dictionary<string, string> Value
        {
            get
            {
                if (_values == null)
                    LoadConfiguration();
                return _values;
            }
        }

        private static void LoadConfiguration()
        {
            _values = new Dictionary<string, string>();
            LoadSetting("SmtpHost");
            LoadSetting("SmtpPort");
            LoadSetting("SmtpUsername");
            LoadSetting("SmtpPassword");
        }

        private static void LoadSetting(string setting)
        {
            _values[setting] = Microsoft.WindowsAzure.CloudConfigurationManager.GetSetting(setting);
        }
    }
}