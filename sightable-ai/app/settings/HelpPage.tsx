import { MessageSquare, User, Mail, Send } from "lucide-react";
import { useState } from "react";

export default function HelpPage() {
  const [formData, setFormData] = useState({
    helpName: "",
    helpEmail: "",
    helpSubject: "",
    helpMessage: "",
  });
  const handleSubmitHelp = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Your message has been sent! We'll get back to you soon.");
      setFormData((prev) => ({
        helpName: "",
        helpEmail: "",
        helpSubject: "",
        helpMessage: "",
      }));
    }, 1500);
  };
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Help & Support
        </h1>
        <p className="text-slate-400">
          Get in touch with our team. We typically respond within 24 hours.
        </p>
      </div>

      <div className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/30">
            <MessageSquare className="w-8 h-8 text-slate-900" />
          </div>
        </div>

        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Contact Us
        </h2>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Your Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={formData.helpName}
                onChange={(e) => handleInputChange("helpName", e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300"
                placeholder="Your Name."
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                value={formData.helpEmail}
                onChange={(e) => handleInputChange("helpEmail", e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={formData.helpSubject}
              onChange={(e) => handleInputChange("helpSubject", e.target.value)}
              className="w-full h-12 px-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300"
              placeholder="How can we help?"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Message
            </label>
            <textarea
              value={formData.helpMessage}
              onChange={(e) => handleInputChange("helpMessage", e.target.value)}
              rows="6"
              className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 resize-none"
              placeholder="Tell us more about your question or issue..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitHelp}
            disabled={isSaving}
            className="w-full py-4 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-xl font-semibold text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:scale-[1.02] transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-slate-700">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">
            Other ways to get help:
          </h3>
          <div className="space-y-2 text-sm text-slate-400">
            <p>
              📧 Email:{" "}
              <a
                href=""
                className="text-teal-400 hover:text-teal-300"
              >
                support@sightable.ai
              </a>
            </p>
            <p>💬 Live Chat: Available Mon-Fri, 8:00-16:00pm GMT</p>
            <p>
              📚 Documentation:{" "}
              <a href="https://github.com/gabrielCSSM/Sightable-AI" className="text-teal-400 hover:text-teal-300">
                https://github.com/gabrielCSSM/Sightable-AI
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
