import React from 'react';
import Layout from '@/components/layout/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">Last updated: April 5, 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              At Blogi, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains 
              how we collect, use, and safeguard your information when you use our website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you create an account or post content. This may include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Username</li>
              <li>Email address</li>
              <li>Profile information</li>
              <li>Content you post</li>
              <li>Communications with us</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Automatically Collected Information</h2>
            <p>
              When you use our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions</li>
              <li>Send administrative messages</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Sharing Your Information</h2>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Service providers who perform services on our behalf</li>
              <li>Legal authorities when required by law</li>
              <li>Third parties in connection with a business transfer</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of 
              transmission over the Internet is 100% secure.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data, such as the right to access, 
              correct, or delete your data.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 13, and we do not knowingly collect personal 
              information from children.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@blogi.com" className="text-blogi-600 hover:underline">privacy@blogi.com</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;