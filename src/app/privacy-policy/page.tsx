import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Credit Guide & Privacy Statement",
  description:
    "Read Start Finance's Credit Guide and Privacy Statement to understand how we're licensed, how we're paid, how to make a complaint, and how we keep your data safe throughout the loan process.",
  alternates: { canonical: "/privacy-policy" },
};

const c = site.compliance;

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Credit Guide and Privacy Statement" intro="This document explains who we are, how we are licensed and paid, what you should do if you have a complaint, and how we collect, use and protect your personal information." />
      <section>
        <Container className="py-14 md:py-16">
          <div className="prose-sf max-w-3xl">
            <div className="not-prose mb-10 rounded-2xl border border-gold/50 bg-gold/10 p-5 text-sm text-ink-soft">
              <strong className="text-ink">Note:</strong> items shown in [square brackets] are placeholders and will be completed once licensing details are confirmed. Edit them in <code>src/lib/site.ts</code>.
            </div>

            <h2>About us</h2>
            <p>
              <strong>Company name:</strong> {site.legalName}
              <br />
              <strong>Corporate Credit Representative Number:</strong> {c.corporateCrn}
              <br />
              <strong>Individual Credit Representative Number:</strong> {c.individualCrn}
            </p>
            <p>
              <strong>Contact details</strong>
              <br />
              Address: {site.address.full}
              <br />
              Tel: {site.phone}
              <br />
              Email: {site.email}
            </p>
            <p>
              <strong>Licensee</strong>
              <br />
              {c.licensee} ACN {c.licenseeAcn}, Australian Credit Licence {c.acl}
            </p>
            <p>
              <strong>Broker Group / Aggregator</strong>
              <br />
              {c.aggregator}
            </p>
            <p>
              This document provides you with information relating to our activities and those of our credit representatives. It contains information about various fees and charges that may be payable by you to us, as well as about certain commissions we may receive from a licensee when we are acting as a credit representative, or we pay to certain third parties. It also contains information about what you should do if you have a complaint or dispute in connection with our services as a credit representative.
            </p>

            <h2>What is a credit representative?</h2>
            <p>A ‘credit representative’ is a person who has been authorised by a credit licensee to engage in specified credit activities on behalf of the licensee. The particulars of our licensee are noted above.</p>

            <h2>What is credit assistance?</h2>
            <p>We give you credit assistance when:</p>
            <ul>
              <li>we assist you to apply for a particular loan or lease;</li>
              <li>we suggest you apply for a particular loan or lease (or suggest you apply for an increase to an existing loan); or</li>
              <li>we suggest you remain in your current loan or lease.</li>
            </ul>

            <h2>The assessment we need to do before giving you credit assistance</h2>
            <p>Before we provide credit assistance to you, we assess whether the particular loan or lease is suitable for you. To do this, we need to make reasonable inquiries and verify that the loan or lease or increase will meet your requirements and objectives, and that you can meet the proposed repayments.</p>
            <p>We won’t be able to give you credit assistance if our assessment shows that you won’t be able to meet the proposed repayments without substantial hardship, or the loan or lease won’t meet your requirements or objectives.</p>

            <h2>Getting a copy of our assessment</h2>
            <p>If we provide you with credit assistance, you can ask us for a copy of our assessment any time up to 7 years after we provide you with a credit assistance quote. We will provide you with a copy within 7 business days after the day we receive your request (provided you make the request within 2 years of the date of our credit assistance quote), or otherwise within 21 business days.</p>

            <h2>Information about the licensee and its credit representatives</h2>
            <p>We act as a credit representative of the licensee. We are authorised to engage in credit activities including providing credit assistance and acting as an intermediary on its behalf. Subject to meeting credit criteria, we are able to assist you to obtain loans and leases from a broad range of lenders and lessors through our Broker Group.</p>
            <p>A list of the lenders with which we hold accreditation, and our top six residential lenders by volume for the previous financial year, is available on request.</p>

            <h2>Ownership</h2>
            <p>We obtain mortgage aggregation services from the Broker Group. The Broker Group provides services at arm’s-length to our business which include IT systems, loan information and lodgement systems, training and development, commission processing, conferences and professional development events, and assistance with regulatory and compliance obligations. In consideration of the services the Broker Group gives us, we pay fees to the Broker Group or the Broker Group retains some of the commission panel lenders pay on loans we arrange.</p>

            <h2>Fees and charges</h2>
            <p><strong>Fees payable for the provision of credit assistance.</strong> We may charge a fee for providing credit assistance or associated with providing credit assistance. More detail about those fees will be set out in a quote we will give to you before we provide you with credit assistance.</p>
            <p><strong>Fees payable in relation to acting as a credit representative.</strong> We may receive remuneration from our licensee and/or Broker Group. We do not charge you any fees or charges in relation to acting as a credit representative.</p>
            <p><strong>Other fees and charges.</strong> You may have to pay other fees and charges (such as application fees, valuation fees and other fees) to the lender, lessor or other parties. You should review the disclosure documents and your loan contract or lease for further details.</p>

            <h2>Commissions</h2>
            <p>The Broker Group receives commissions from lenders and lessors and pays us commission in relation to loan contracts or leases for which we act as a credit representative and provide credit assistance. The total amount of commission we may receive may vary depending on the lender or lessor, the term, the features, the amount of the loan or lease you ultimately choose and the amount and timing of the repayments that you make.</p>
            <h3>Home loans and investment property loans</h3>
            <p>Upfront commission payable by lenders is calculated as a percentage of the loan amount and is generally in the range of 0.55% and 0.803% of the loan amount. It is usually paid after settlement of the loan. Trail commission is generally calculated regularly on the outstanding loan balance and paid in arrears, and is generally in the range of 0.00% and 0.385% per annum of the outstanding loan amount.</p>
            <h3>Personal loans</h3>
            <p>Upfront commission payable by lenders is generally in the range of 1.65% and 2.75% of the loan amount, usually paid after settlement. Trail commission on personal loans is generally 0.00% per annum.</p>
            <h3>Volume bonus arrangements</h3>
            <p>We and our Broker Group do not receive any volume-based benefit for residential home loan products. From time to time we or the Broker Group may receive a benefit, directly by way of cash bonus or additional commissions or indirectly by way of training, professional development days or sponsorship, if we or the Broker Group write a particular volume of loans offered by lenders for products such as commercial and lease products.</p>
            <h3>Commissions payable by us</h3>
            <p>If a third party has introduced you to us or referred you to us, we may pay them a commission or a fee. More detail about those payments will be set out in the credit proposal disclosure, which forms part of the Statement of Credit Assistance document we will give to you before we provide credit assistance. We may obtain referrals from a range of sources, including real estate agents, accountants, financial planners or other people.</p>

            <h2>Disputes or complaints</h2>
            <p>We are committed to providing our customers with the best possible service. If at any time we have not met our obligations – or you have a complaint about any of our services – please inform us so we can work towards a resolution. We will endeavour to deal with your complaint promptly, thoroughly and fairly.</p>
            <ol>
              <li>If your complaint is about your loan, in the first instance please contact your lender or credit assistance provider.</li>
              <li>If your complaint has not been resolved to your satisfaction within 5 business days or if your complaint is about the services we provided to you, please contact the Licensee listed above.</li>
            </ol>
            <p>Our Complaints Area will acknowledge receipt of your complaint within five business days. Within 45 calendar days from the date you lodged the complaint with us, we will write to you advising the outcome of the investigation and the reasons for our decision, or inform you if more time is needed.</p>
            <p>If you do not think we have resolved your complaint to your satisfaction, you may take the matter – free of charge – to the Australian Financial Complaints Authority (AFCA): online at www.afca.org.au, by email at info@afca.org.au, by phone on 1800 931 678, or by mail at GPO Box 3, Melbourne VIC 3001.</p>

            <h2>Other disclosures</h2>
            <p><strong>Broker benefits disclosures.</strong> In line with industry reforms, we keep a register of benefits received from any lenders or aggregators to the value of $100 or more (over a rolling 12-month period, housed for 3 years). You may request a copy of this register.</p>
            <p><strong>Tiered servicing disclosures.</strong> We have access to service programs available from some residential home loan providers. These programs promote preferential services to a customer and do not entitle us to additional payments or commissions or to preferential customer discounts.</p>

            <h2>Privacy statement</h2>
            <p>We need to collect personal information about you to provide you with our broking and related services. This privacy statement tells you how we collect your information, what we use the information for and who we share the information with.</p>
            <h3>How information is collected from you</h3>
            <p>We will collect your information from you directly whenever we can, such as from enquiries we make of you when you seek credit assistance from us. We may verify that information from sources referred to in the responses to those enquiries or in this privacy statement.</p>
            <h3>How information is collected from other sources</h3>
            <p>Sometimes we will collect information about you from other sources as the Privacy Act 1988 permits – for example, from third parties about a loan or lease in relation to which you seek our services; from public information to update your contact details; or through exchange with your legal or financial advisers or other representatives.</p>
            <h3>When the law authorises or requires collection of information</h3>
            <p>Some laws may require us to collect personal information about you – for example, to verify your identity under Australian anti-money laundering law.</p>
            <h3>How your information may be used</h3>
            <p>We may use your information for purposes including: giving you credit assistance; giving you information about loan products or related services; considering whether you are eligible for a loan or lease; assisting you to prepare an application; administering services we provide; telling you about other products or services that may be of interest to you (unless you tell us not to); improving our service; running our business efficiently; preventing or investigating fraud or crime; as required by law; and any purpose to which you have consented. You can let us know at any time if you no longer wish to receive direct marketing offers from us.</p>
            <h3>What happens if you don’t provide information?</h3>
            <p>If you don’t provide your information to us, it may not be possible to assist in finding a loan or lease relevant to your circumstances, verify your identity or protect against fraud, or let you know about products or services that might be suitable for your needs.</p>
            <h3>Sharing your information</h3>
            <p>We may share your information with your representatives and referees, and with third parties in relation to services we provide to you. Those third parties may include: the Broker Group through whom we submit applications; the Australian Credit Licence holder that authorises us to engage in credit activities; referrers; financial services suppliers with whom we have arrangements; valuers; lenders, lessors, lender’s mortgage insurers and other intermediaries; fraud reporting agencies; government or regulatory bodies as required by law; guarantors and prospective guarantors; service providers that assist us to conduct our business; any organisation that wishes to take an interest in our business or assets; and any third party to which you consent to us sharing your information.</p>
            <h3>Sharing outside of Australia</h3>
            <p>We may store your information in cloud or other networked or electronic storage. As electronic storage can be accessed from various countries via an internet connection, it is not always practicable to know in which country your information may be held.</p>
            <h3>Information about other people</h3>
            <p>If you give information to us about another person (such as a co-applicant), you will let that other person know that we have collected their information to provide our services, that we may exchange it with the organisations set out in this notice, that we handle their personal information as set out here, and that they can access or request a copy of this notice or the information we hold about them using our contact details above.</p>
            <h3>Access, correction and privacy complaints</h3>
            <p>You can ask us to access and seek to correct information we hold about you, and you may complain to us about a privacy issue, using the contact details above. If you are not satisfied with our response you may contact the Office of the Australian Information Commissioner.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
