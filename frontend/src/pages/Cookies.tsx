import React from 'react';
import Layout from '@/components/layout/Layout';

const Cookies = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Cookie Policy</h1>
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">Last updated: April 5, 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              This Cookie Policy explains how Blogi uses cookies and similar technologies to recognize you when you visit our website. 
              It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
              Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
              as well as to provide reporting information.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Types of Cookies We Use</h2>
            <p>
              We use the following types of cookies:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Essential cookies:</strong> These cookies are necessary for the website to function properly.</li>
              <li><strong>Preference cookies:</strong> These cookies remember your preferences and settings.</li>
              <li><strong>Analytics cookies:</strong> These cookies help us understand how visitors interact with our website.</li>
              <li><strong>Marketing cookies:</strong> These cookies track your online activity to help deliver targeted advertising.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Specific Cookies We Use</h2>
            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">session_id</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Authentication</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Session</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">_ga</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Google Analytics</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 years</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">_gid</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Google Analytics</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">24 hours</td>
                </tr>
              </tbody>
            </table>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. How to Manage Cookies</h2>
            <p>
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. 
              If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website 
              and to deliver advertisements on and through the website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new 
              Cookie Policy on this page.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at <a href="mailto:cookies@blogi.com" className="text-blogi-600 hover:underline">cookies@blogi.com</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cookies;