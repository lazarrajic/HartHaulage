import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import PageHero from '../components/PageHero';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-in ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const TERMS_PDF = '/hart-haulage-terms-and-conditions.pdf';
const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi'];

// Terms of Trade, reproduced from the Hart Haulage Ltd terms document (March 2026).
// A clause is a string, or { text, sub: [...] } for nested sub-clauses.
const sections = [
  {
    title: 'Declaration',
    clauses: [
      `The company accepts that to the extent permitted by law the customers on these conditions which conditions (together with the company's acceptance) constitutes the agreement between the Company and the customer (except to the extent that such terms and conditions are modified in writing and signed by both parties) and it expressly agreed that there are no other understanding, representations of warranties of any kind (express or implied) forming part of the contract.`,
      `Any variation, waiver or cancellation of the customer's order shall be of no effect unless accepted in writing by the company. Where the company accepts cancellation, the company may levy a handling charge up to 25% of the price, in case of non-processed orders, and 50% of the price in respect of processed orders.`,
      `If any terms or conditions or part thereof contained in these terms of trade and held to be invalid, illegal, unenforceable or void for any reason or reasons, all of these remaining terms and conditions (or part thereof) shall remain in force and effect.`,
      `The customer agrees that in the event of default or settlement of any account due, the customer shall pay upon demand, all reasonable cost, charges and legal expenses (including costs between solicitors and own client) including any collection costs incurred by the company in recovering the outstanding account from the customer.`,
    ],
  },
  {
    title: 'Delivery',
    clauses: [
      `The company may withhold delivery in terms of clause b above.`,
      `If the customer fails or refuses or indicates to the company that the customer will fail or refuse to take or accept delivery, the goods shall be deemed delivered when the company was willing to deliver them.`,
      `Proof of delivery information will not be provided by the Company beyond 60 days from date invoice.`,
      `Any quotations of delivery times by the company are made in good faith but as estimates are not commitments the company shall not be bound by such estimates.`,
    ],
  },
  {
    title: 'Pricing and Terms of Trade',
    clauses: [
      `The company's prices are subject to alteration without notice and the price payable by the customer for the goods ordered shall be the price agreed to between the Company and the customer or in the absence of such agreement the price ruling at the date the goods are dispatched. The onus is in the customer to confirm prices prior to delivery.`,
      `The Company may apply a Fuel Adjustment Factor (FAF) from time to time to reflect changes in diesel fuel pricing. The FAF will be calculated using a formula based on the MBIE weekly published diesel price compared against the base diesel price used when establishing the Company's freight rates. The applicable FAF percentage may vary and will be advised where applicable. The FAF may be introduced, varied or removed at the Company's discretion.`,
      `All accounts are due for payment on within days following invoice date.`,
      `The Company may offer prompt payment discounts at its discretion. Where a prompt payment discount is applied, the discounted rate is conditional upon payment being received by the due date. In the event payment is not received by the due date, the Company reserves the right to withdraw the discount and invoice the full undiscounted amount.`,
      {
        text: `Without prejudice to its right to sue for payment or exercise any other remedy where any payment is not made on the due date the company may:`,
        sub: [
          `Re-invoice goods at the then current full price.`,
          `Charge the customer interest on the amount outstanding at the rate equal to 1.5% per month, calculated daily from the due date of the payment until payment is received by the company but the charging of interest does not extend the time for payment nor imply the forbearance to sue otherwise recover overdue monies.`,
          `Demand payment of arrears as well as payment in advance for any undelivered goods before proceeding with making any further delivery of goods under the contract.`,
        ],
      },
    ],
  },
  {
    title: 'Ownership and Payment Terms',
    clauses: [
      `All goods supplied by Hart Haulage Limited remain the property of Hart Haulage Limited until full payment has been received.`,
      `Payment is due by the specified date on the issued invoice. If payment has not been received by the due date, Hart Haulage Limited reserves the right to recover the goods. Any costs associated with the recovery of goods, including but not limited to transportation and handling fees, will be charged to the customer.`,
      `In the event of non-payment, the customer remains liable for all costs incurred by Hart Haulage Limited in supplying the goods, including the original cost of goods and any additional recovery expenses. This liability will persist regardless of whether the goods are recovered.`,
      `By placing an order with Hart Haulage Limited, the customer agrees to these terms and conditions in full.`,
    ],
  },
];

const finalNotes = [
  `Payment is to be into account 06-0622-0933446-00 on the terms shown above in clause b.II.`,
  `Claims arising from invoices must be made within 7 working days.`,
  `By submitting this application, you authorise Hart Haulage Limited to make inquiries into the banking and business/trade references that you have supplied.`,
];

export default function Terms() {
  return (
    <>
      <title>Terms & Conditions | Hart Haulage Ltd</title>

      <PageHero
        title="Terms & Conditions"
        subtitle="Terms and Conditions of Trade governing the supply of services by Hart Haulage Ltd."
        accent="Legal"
        cmsPage="Terms"
      />

      <section className="bg-charcoal-dark py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro + download */}
          <AnimatedSection>
            <div className="bg-charcoal-mid border-l-4 border-pink rounded-r-xl p-8 md:p-10 mb-10">
              <p className="font-body text-gray-300 text-lg leading-relaxed">
                These terms apply to all services supplied unless otherwise agreed in writing.
              </p>
              <p className="font-body text-muted text-sm uppercase tracking-widest mt-4">
                Last updated: March 2026
              </p>
              <a
                href={TERMS_PDF}
                download
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-pink hover:bg-pink-dark text-white font-body font-bold tracking-wide rounded transition-all duration-200 hover:scale-105"
              >
                <Download size={18} /> Download as PDF
              </a>
            </div>
          </AnimatedSection>

          {/* Terms sections */}
          <div className="space-y-6">
            {sections.map((section, si) => (
              <AnimatedSection key={section.title} delay={si * 60}>
                <div className="bg-charcoal-mid border-l-4 border-pink rounded-r-xl p-8 md:p-10">
                  <h2 className="font-heading font-black uppercase text-white text-2xl md:text-3xl leading-none mb-6">
                    {section.title}
                  </h2>
                  <ol className="space-y-4">
                    {section.clauses.map((clause, ci) => {
                      const isObj = typeof clause !== 'string';
                      const text = isObj ? clause.text : clause;
                      return (
                        <li key={ci} className="flex gap-3">
                          <span className="font-heading font-bold text-pink shrink-0 w-5">
                            {String.fromCharCode(97 + ci)})
                          </span>
                          <div className="font-body text-gray-300 text-sm leading-relaxed">
                            <p>{text}</p>
                            {isObj && clause.sub && (
                              <ol className="mt-3 space-y-2">
                                {clause.sub.map((sub, sIdx) => (
                                  <li key={sIdx} className="flex gap-2">
                                    <span className="text-pink shrink-0 w-7 text-right">
                                      {ROMAN[sIdx]}.
                                    </span>
                                    <span>{sub}</span>
                                  </li>
                                ))}
                              </ol>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </AnimatedSection>
            ))}

            {/* Final notes */}
            <AnimatedSection delay={sections.length * 60}>
              <div className="bg-charcoal-mid border-l-4 border-pink rounded-r-xl p-8 md:p-10">
                <ol className="space-y-3">
                  {finalNotes.map((note, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-heading font-bold text-pink shrink-0 w-5">{i + 1}.</span>
                      <span className="font-body text-gray-300 text-sm leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="font-body text-gray-300 mb-6">
              Questions about our terms of trade? Get in touch with the team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink hover:bg-pink-dark text-white font-body font-bold tracking-wide text-lg rounded transition-all duration-200 hover:scale-105"
            >
              Contact Us
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
