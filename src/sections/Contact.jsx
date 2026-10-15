import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import SectionWrapper from '../components/SectionWrapper';
import { socialLinks } from '../data/personal';
import axios from 'axios';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email.';
    if (!form.subject.trim()) errs.subject = 'Subject is required.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    else if (form.message.trim().length < 10) errs.message = 'Message too short (min 10 chars).';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await axios.post(`${apiBase}/api/contact`, form);
      setStatus('success');
      setServerMsg(res.data?.message || 'Message sent successfully!');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setServerMsg(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: socialLinks.email,
      href: `mailto:${socialLinks.email}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Delhi, India',
    },
    {
      icon: GithubIcon,
      label: 'GitHub',
      value: 'github.com/Abhaypandit05',
      href: socialLinks.github,
      external: true,
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'linkedin.com/in/abhay-kumar-036915342',
      href: socialLinks.linkedin,
      external: true,
    },
  ];

  return (
    <SectionWrapper
      id="contact"
      title="Get In Touch"
      subtitle="Have a question or want to work together? I'd love to hear from you."
    >
      <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
        {/* Contact info */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Let's Connect</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Feel free to reach out for collaborations, opportunities, or just a
              friendly chat about technology and development.
            </p>
          </div>

          <div className="space-y-4">
            {contactItems.map(({ icon: Icon, label, value, href, external }) => {
              const Wrapper = href ? 'a' : 'div';
              const linkProps = href
                ? {
                    href,
                    target: external ? '_blank' : undefined,
                    rel: external ? 'noopener noreferrer' : undefined,
                  }
                : {};

              return (
                <Wrapper
                  key={label}
                  {...linkProps}
                  className="flex items-center gap-4 glass-card p-4 rounded-xl group"
                >
                  <div className="p-2.5 rounded-lg bg-[var(--color-accent-blue)]/10 group-hover:bg-[var(--color-accent-blue)]/20 transition-colors">
                    <Icon size={20} className="text-[var(--color-accent-blue)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                      {label}
                    </p>
                    <p className="text-sm text-slate-300 group-hover:text-white transition-colors break-all">
                      {value}
                    </p>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          className="lg:col-span-3 glass-card p-6 md:p-8 rounded-xl space-y-5"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-1.5">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && (
                <p className="text-xs text-red-400 mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-300 mb-1.5">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="What's this about?"
              value={form.subject}
              onChange={handleChange}
              className={`form-input ${errors.subject ? 'error' : ''}`}
            />
            {errors.subject && (
              <p className="text-xs text-red-400 mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300 mb-1.5">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Tell me about your project or idea..."
              value={form.message}
              onChange={handleChange}
              className={`form-input resize-none ${errors.message ? 'error' : ''}`}
            />
            {errors.message && (
              <p className="text-xs text-red-400 mt-1">{errors.message}</p>
            )}
          </div>

          {/* Status messages */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-emerald-400 text-sm"
            >
              <CheckCircle2 size={18} />
              {serverMsg}
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 text-sm"
            >
              <AlertCircle size={18} />
              {serverMsg}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}