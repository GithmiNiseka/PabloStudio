import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './FAQ.css';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqCategories = {
    general: {
      title: 'General Questions',
      questions: [
        {
          question: 'What services does PABLO offer?',
          answer: 'PABLO specializes in creative interior art, wall murals, custom illustrations, eco-friendly décor, and handcrafted design solutions for homes, businesses, and institutions. We also offer product design through our associated brands.'
        },
        {
          question: 'Do you design and decorate interior spaces?',
          answer: 'Yes! We provide professional interior decoration services including hand-painted murals, wall art, visual branding installations, thematic décor for rooms, business floors, office spaces, schools, and healthcare environments.'
        },
        {
          question: 'What materials does PABLO use?',
          answer: 'We use high-quality, sustainable, and eco-friendly materials such as natural paints, wood, canvas, hand-crafted media, and zero-plastic packaging whenever possible. Our products and installations are designed to last and be environmentally responsible.'
        },
        {
          question: 'How does the custom project process work?',
          answer: '1. Consultation: We discuss your vision, space, or product idea.\n2. Concept Sketch: We provide sketches and design concepts.\n3. Approval: You approve the design direction.\n4. Creation: We craft the artwork, mural, or product.\n5. Installation / Delivery: We install or deliver the finished product.'
        }
      ]
    },
    thotilla: {
      title: 'Thotilla.lk (Baby & Kids)',
      questions: [
        {
          question: 'What is Thotilla.lk?',
          answer: 'Thotilla.lk is a sub-brand of PABLO that specializes in baby and kids room décor, child-friendly furniture, and nursery design solutions. We focus on creating safe, joyful, and creative spaces for children.'
        },
        {
          question: 'Do you design baby and kids rooms?',
          answer: 'Yes. Through Thotilla.lk, we design and create custom baby rooms, kids bedrooms, study spaces, desks, tables, and child-friendly décor, using safe materials and thoughtful design.'
        },
        {
          question: 'Can I order custom baby furniture or gifts?',
          answer: 'Absolutely. We accept custom orders for baby furniture, kids décor, and gifts. Each piece is designed specifically to match your requirements, space, and theme.'
        },
        {
          question: 'Are Thotilla products eco-friendly?',
          answer: 'Yes. Thotilla.lk follows PABLO\'s eco-friendly and low-plastic design philosophy, prioritizing safe and sustainable materials for all children\'s products.'
        }
      ]
    },
    souvenir: {
      title: 'Souvenir & Gifts',
      questions: [
        {
          question: 'What kind of souvenir products do you offer?',
          answer: 'Our souvenir collection includes handmade and custom gift items, such as personalized keepsakes, artistic gifts, corporate giveaways, and eco-friendly gift products designed with creativity and care.'
        },
        {
          question: 'Are souvenir products eco-friendly?',
          answer: 'Yes. Our souvenir products follow PABLO\'s eco-friendly and low-plastic design philosophy, prioritizing safe and sustainable materials.'
        },
        {
          question: 'Can you create custom souvenir designs?',
          answer: 'Yes. We can design and produce custom souvenirs and keepsakes for events, businesses, weddings, brand promotions, cultural celebrations, and more.'
        },
        {
          question: 'Do you ship products outside Sri Lanka?',
          answer: 'Yes, international shipping is available for our souvenir products and selected handcrafted items. Shipping fees and delivery times vary by destination.'
        }
      ]
    },
    projects: {
      title: 'Projects & Timeline',
      questions: [
        {
          question: 'How long does a project usually take?',
          answer: 'Project durations vary:\n• Small décor items & souvenirs: 2–7 days\n• Wall murals & interior installations: 1–4 weeks\n• Large institutional projects: 4–8+ weeks\nWe provide specific timelines after consultation.'
        },
        {
          question: 'Can you work on large institutional projects?',
          answer: 'Absolutely! PABLO has experience decorating large-scale spaces such as hospital wards, school walls, office interiors, and public areas. We tailor each design to match the mood and purpose of the space.'
        },
        {
          question: 'Do you offer online design consultations?',
          answer: 'Yes. We can connect with you via WhatsApp, phone, or video call to discuss your project, share concept sketches, and provide estimates without requiring an in-person meeting.'
        },
        {
          question: 'What forms of payment do you accept?',
          answer: 'We accept:\n• Bank transfers\n• Cash on delivery for local orders\nPayment options may vary with project type.'
        }
      ]
    }
  };

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="faq-page">
      <Nav />
      
      <div className="faq-layout">
        {/* Hero Section */}
        <section className="faq-hero">
          <h1 className="faq-title">FAQ</h1>
          <p className="faq-description">
            Find answers to common questions about our services, products, and process.
          </p>
        </section>

        {/* Category Tabs */}
        <section className="faq-categories">
          <div className="category-tabs">
            {Object.keys(faqCategories).map((category) => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenQuestion(null);
                }}
              >
                {faqCategories[category].title}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Questions */}
        <section className="faq-questions">
          <div className="questions-container">
            {faqCategories[activeCategory].questions.map((item, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="question-text">{item.question}</span>
                  <span className="expand-icon">
                    {openQuestion === index ? '−' : '+'}
                  </span>
                </button>
                <div className={`faq-answer ${openQuestion === index ? 'open' : ''}`}>
                  <div className="answer-content">
                    {item.answer.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="faq-contact">
          <h3 className="contact-title">Still have questions?</h3>
          <p className="contact-description">
            Can't find what you're looking for? Get in touch with our team.
          </p>
          <a href="/contact" className="contact-button">
            Contact Us
          </a>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;